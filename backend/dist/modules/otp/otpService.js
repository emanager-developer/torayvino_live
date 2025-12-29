"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OTPService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
const otpVerificationModel_1 = __importDefault(require("./otpVerificationModel"));
const otpRateLimitModel_1 = __importDefault(require("./otpRateLimitModel"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const sendSMS_1 = require("../../utils/sendSMS");
const sendEmailDynamic_1 = require("../../utils/sendEmailDynamic");
// Configuration
const OTP_CONFIG = {
    EXPIRY_MINUTES: 5,
    MAX_ATTEMPTS: 3,
    RATE_LIMIT: {
        MAX_HOURLY: 5, // Maximum 5 OTPs per hour per phone
        COOLDOWN_MINUTES: 1, // 1 minute cooldown between requests
        BLOCK_DURATION_HOURS: 1, // Block for 1 hour if limit exceeded
    },
};
/**
 * Generate a 6-digit OTP
 */
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};
/**
 * Generate a unique verification ID
 */
const generateVerificationId = () => {
    return `verify_${Date.now()}_${crypto_1.default.randomBytes(8).toString('hex')}`;
};
/**
 * Hash OTP for secure storage
 */
const hashOTP = (otp) => __awaiter(void 0, void 0, void 0, function* () {
    const saltRounds = 10;
    return yield bcrypt_1.default.hash(otp, saltRounds);
});
/**
 * Verify hashed OTP
 */
const verifyHashedOTP = (otp, hashedOTP) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt_1.default.compare(otp, hashedOTP);
});
/**
 * Check and update rate limiting
 */
const checkRateLimit = (phoneNumber) => __awaiter(void 0, void 0, void 0, function* () {
    const now = new Date();
    let rateLimit = yield otpRateLimitModel_1.default.findOne({ phoneNumber });
    if (!rateLimit) {
        // Create new rate limit record
        rateLimit = yield otpRateLimitModel_1.default.create({
            phoneNumber,
            requestCount: 1,
            hourlyCount: 1,
            lastRequestAt: now,
            hourlyResetTime: new Date(now.getTime() + 60 * 60 * 1000),
        });
        return { allowed: true, remaining: OTP_CONFIG.RATE_LIMIT.MAX_HOURLY - 1 };
    }
    // Check if blocked
    if (rateLimit.blockedUntil && rateLimit.blockedUntil > now) {
        throw new AppError_1.default(http_status_1.default.TOO_MANY_REQUESTS, `Too many OTP requests. Blocked until ${rateLimit.blockedUntil.toLocaleString()}`);
    }
    // Reset hourly count if hour has passed
    if (rateLimit.hourlyResetTime <= now) {
        rateLimit.hourlyCount = 0;
        rateLimit.hourlyResetTime = new Date(now.getTime() + 60 * 60 * 1000);
    }
    // Check hourly limit
    if (rateLimit.hourlyCount >= OTP_CONFIG.RATE_LIMIT.MAX_HOURLY) {
        // Block for specified duration
        rateLimit.blockedUntil = new Date(now.getTime() +
            OTP_CONFIG.RATE_LIMIT.BLOCK_DURATION_HOURS * 60 * 60 * 1000);
        yield rateLimit.save();
        throw new AppError_1.default(http_status_1.default.TOO_MANY_REQUESTS, `Maximum ${OTP_CONFIG.RATE_LIMIT.MAX_HOURLY} OTPs per hour exceeded. Try again later.`);
    }
    // Check cooldown period
    const timeSinceLastRequest = now.getTime() - rateLimit.lastRequestAt.getTime();
    const cooldownMs = OTP_CONFIG.RATE_LIMIT.COOLDOWN_MINUTES * 60 * 1000;
    if (timeSinceLastRequest < cooldownMs) {
        const remainingSeconds = Math.ceil((cooldownMs - timeSinceLastRequest) / 1000);
        throw new AppError_1.default(http_status_1.default.TOO_MANY_REQUESTS, `Please wait ${remainingSeconds} seconds before requesting another OTP`);
    }
    // Update rate limit
    rateLimit.requestCount += 1;
    rateLimit.hourlyCount += 1;
    rateLimit.lastRequestAt = now;
    yield rateLimit.save();
    return {
        allowed: true,
        remaining: OTP_CONFIG.RATE_LIMIT.MAX_HOURLY - rateLimit.hourlyCount,
    };
});
const normalizeBDPhone = (phone) => {
    phone = phone.replace(/\D/g, '');
    if (phone.startsWith('880'))
        return phone;
    if (phone.startsWith('0'))
        return '88' + phone;
    if (phone.startsWith('1'))
        return '880' + phone;
    return phone;
};
/**
 * Send OTP to phone number
 */
const sendOTP = (phoneNumber, ipAddress, userAgent) => __awaiter(void 0, void 0, void 0, function* () {
    // Check rate limiting
    const rateLimitResult = yield checkRateLimit(phoneNumber);
    // Generate OTP and verification ID
    const otpCode = generateOTP();
    const verificationId = generateVerificationId();
    const expiresAt = new Date(Date.now() + OTP_CONFIG.EXPIRY_MINUTES * 60 * 1000);
    // Hash the OTP for storage
    const hashedOTP = yield hashOTP(otpCode);
    // Expire any existing unverified OTPs for this phone number
    yield otpVerificationModel_1.default.updateMany({
        phoneNumber,
        isVerified: false,
        isExpired: false,
    }, {
        isExpired: true,
    });
    // Save OTP verification record
    yield otpVerificationModel_1.default.create({
        verificationId,
        phoneNumber,
        otpCodeHash: hashedOTP,
        expiresAt,
        ipAddress,
        userAgent,
    });
    let message = `Your verification code is: ${otpCode}. It will expire in ${OTP_CONFIG.EXPIRY_MINUTES} minutes.`;
    const normalizedPhone = normalizeBDPhone(phoneNumber);
    // eslint-disable-next-line no-console
    console.log('send-otp-message: ', normalizedPhone, message);
    message += `\n\nVisit: ${process.env.FRONTEND_URL}`;
    // Send SMS (commented out for development)
    const smsResult = yield (0, sendSMS_1.sendSMS)(normalizedPhone, message);
    // eslint-disable-next-line no-console
    console.log('send-otp-sms-result: ', smsResult);
    if (!smsResult.success) {
        throw new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Failed to send OTP SMS');
    }
    return {
        verificationId,
        expiresAt,
        expiresIn: OTP_CONFIG.EXPIRY_MINUTES * 60, // seconds
        remaining: rateLimitResult.remaining,
        messageId: smsResult.messageId,
        // 🚨 DEVELOPMENT ONLY - Remove in production!
        developmentOTP: otpCode, // Include OTP in response for testing
    };
});
/**
 * Verify OTP
 */
const verifyOTP = (phoneNumber, otpCode, verificationId) => __awaiter(void 0, void 0, void 0, function* () {
    // Find verification record
    const verification = yield otpVerificationModel_1.default.findOne({
        verificationId,
        phoneNumber,
        isVerified: false,
        isExpired: false,
    });
    if (!verification) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Invalid verification ID or phone number');
    }
    // Check if expired
    if (verification.expiresAt < new Date()) {
        verification.isExpired = true;
        yield verification.save();
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'OTP has expired. Please request a new one.');
    }
    // Check attempt limit
    if (verification.attempts >= verification.maxAttempts) {
        verification.isExpired = true;
        yield verification.save();
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Maximum attempts exceeded. Please request a new OTP.');
    }
    // Increment attempts
    verification.attempts += 1;
    yield verification.save();
    // Verify OTP
    const isValidOTP = yield verifyHashedOTP(otpCode, verification.otpCodeHash);
    if (!isValidOTP) {
        const remainingAttempts = verification.maxAttempts - verification.attempts;
        if (remainingAttempts === 0) {
            verification.isExpired = true;
            yield verification.save();
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Invalid OTP. Maximum attempts exceeded.');
        }
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, `Invalid OTP. ${remainingAttempts} attempts remaining.`);
    }
    // Mark as verified
    verification.isVerified = true;
    verification.verifiedAt = new Date();
    yield verification.save();
    // Generate temporary session token (24 hours validity)
    const tempToken = crypto_1.default.randomBytes(32).toString('hex');
    const tempTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    return {
        verified: true,
        phoneNumber,
        tempToken,
        tempTokenExpiry,
        verificationId,
    };
});
/**
 * Resend OTP
 */
const resendOTP = (verificationId, ipAddress, userAgent) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // Find existing verification
    const existingVerification = yield otpVerificationModel_1.default.findOne({
        verificationId,
        isVerified: false,
    });
    if (!existingVerification) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Invalid verification ID');
    }
    if (existingVerification.isExpired) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Verification session expired. Please start a new verification.');
    }
    // Determine identifier (phone or email) for rate limiting and delivery
    const identifier = (_a = existingVerification.phoneNumber) !== null && _a !== void 0 ? _a : existingVerification.email;
    if (!identifier) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'No phone or email associated with this verification');
    }
    // Check rate limiting for the identifier (phone or email)
    const rateLimitResult = yield checkRateLimit(identifier);
    // Generate new OTP but keep the same verification ID
    const otpCode = generateOTP();
    const expiresAt = new Date(Date.now() + OTP_CONFIG.EXPIRY_MINUTES * 60 * 1000);
    // Hash the new OTP
    const hashedOTP = yield hashOTP(otpCode);
    // Update the existing verification record with new OTP and expiry
    existingVerification.otpCodeHash = hashedOTP;
    existingVerification.expiresAt = expiresAt;
    existingVerification.attempts = 0; // Reset attempts for new OTP
    existingVerification.ipAddress = ipAddress;
    existingVerification.userAgent = userAgent;
    yield existingVerification.save();
    let message = `Your verification code is: ${otpCode}. It will expire in ${OTP_CONFIG.EXPIRY_MINUTES} minutes.`;
    // Delivery: if phoneNumber present, send SMS; otherwise send email
    if (existingVerification.phoneNumber) {
        const normalizedPhone = normalizeBDPhone(existingVerification.phoneNumber);
        // console.log('resend-otp-message: ', normalizedPhone, message);
        message += `\n\nVisit: ${process.env.FRONTEND_URL}`;
        const smsResult = yield (0, sendSMS_1.sendSMS)(normalizedPhone, message);
        // console.log('resend-otp-sms-result: ', smsResult);
        if (!smsResult.success) {
            throw new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Failed to send OTP SMS');
        }
        return {
            verificationId, // Same verification ID
            expiresAt,
            expiresIn: OTP_CONFIG.EXPIRY_MINUTES * 60, // seconds
            remaining: rateLimitResult.remaining,
            messageId: smsResult.messageId,
            // 🚨 DEVELOPMENT ONLY - Remove in production!
            developmentOTP: otpCode,
        };
    }
    // else send email
    if (existingVerification.email) {
        // eslint-disable-next-line no-console
        console.log('resend-otp-email-message:', existingVerification.email, message);
        yield (0, sendEmailDynamic_1.sendEmailDynamic)({
            to: existingVerification.email,
            subject: 'Your verification code',
            body: `<p>${message}</p>`,
        });
        return {
            verificationId,
            expiresAt,
            expiresIn: OTP_CONFIG.EXPIRY_MINUTES * 60,
            remaining: rateLimitResult.remaining,
            // development OTP for testing
            developmentOTP: otpCode,
        };
    }
});
/**
 * Check verification status
 */
const checkVerificationStatus = (verificationId) => __awaiter(void 0, void 0, void 0, function* () {
    const verification = yield otpVerificationModel_1.default.findOne({ verificationId }, {
        phoneNumber: 1,
        isVerified: 1,
        isExpired: 1,
        expiresAt: 1,
        attempts: 1,
        maxAttempts: 1,
    });
    if (!verification) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Verification not found');
    }
    const now = new Date();
    const isExpired = verification.expiresAt < now || verification.isExpired;
    const remainingAttempts = Math.max(0, verification.maxAttempts - verification.attempts);
    return {
        verificationId,
        phoneNumber: verification.phoneNumber,
        isVerified: verification.isVerified,
        isExpired,
        expiresAt: verification.expiresAt,
        attempts: verification.attempts,
        remainingAttempts,
    };
});
/**
 * Cleanup expired OTPs (run periodically)
 */
const cleanupExpiredOTPs = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield otpVerificationModel_1.default.deleteMany({
        $or: [{ expiresAt: { $lt: new Date() } }, { isExpired: true }],
    });
    // In production, use proper logger: logger.info(`Cleaned up ${result.deletedCount} expired OTP records`)
    return result.deletedCount;
});
/**
 * Cleanup expired rate limit records (run periodically)
 */
const cleanupExpiredRateLimits = () => __awaiter(void 0, void 0, void 0, function* () {
    const now = new Date();
    // Delete rate limit records where:
    // 1. Block period has expired (blockedUntil < now)
    // 2. Hourly reset time has passed by more than 24 hours (old records)
    // 3. No recent activity (lastRequestAt older than 24 hours) and no active blocks
    const result = yield otpRateLimitModel_1.default.deleteMany({
        $or: [
            // Expired blocks
            {
                blockedUntil: { $exists: true, $lt: now },
            },
            // Old hourly reset records (older than 24 hours)
            {
                hourlyResetTime: { $lt: new Date(now.getTime() - 24 * 60 * 60 * 1000) },
            },
            // Inactive records with no blocks (older than 24 hours)
            {
                blockedUntil: { $exists: false },
                lastRequestAt: { $lt: new Date(now.getTime() - 24 * 60 * 60 * 1000) },
            },
        ],
    });
    // In production, use proper logger: logger.info(`Cleaned up ${result.deletedCount} expired rate limit records`)
    return result.deletedCount;
});
/**
 * Comprehensive cleanup of both OTPs and rate limits
 */
const cleanupExpiredRecords = () => __awaiter(void 0, void 0, void 0, function* () {
    const otpCleanup = yield cleanupExpiredOTPs();
    const rateLimitCleanup = yield cleanupExpiredRateLimits();
    return {
        otpRecords: otpCleanup,
        rateLimitRecords: rateLimitCleanup,
        total: otpCleanup + rateLimitCleanup,
    };
});
exports.OTPService = {
    sendOTP,
    verifyOTP,
    resendOTP,
    checkVerificationStatus,
    cleanupExpiredOTPs,
    cleanupExpiredRateLimits,
    cleanupExpiredRecords,
};
