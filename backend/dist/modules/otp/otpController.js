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
exports.OTPController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const otpService_1 = require("./otpService");
const customerModel_1 = require("../customer/customerModel");
const AppError_1 = __importDefault(require("../../errors/AppError"));
/**
 * Send OTP to phone number
 */
const sendOTP = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { phoneNumber } = req.body;
    const ipAddress = req.ip || req.connection.remoteAddress;
    const userAgent = req.get('User-Agent');
    // Debug logging (remove in production)
    // console.log('Send OTP Request:', { phoneNumber, body: req.body });
    const customer = yield customerModel_1.Customer.findOne({ phone: phoneNumber });
    if (customer) {
        const isActive = customer === null || customer === void 0 ? void 0 : customer.isActive;
        if (!isActive) {
            throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'Your account is not active ! Please contact with support.');
        }
    }
    const result = yield otpService_1.OTPService.sendOTP(phoneNumber, ipAddress, userAgent);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'OTP sent successfully',
        data: result,
    });
}));
/**
 * Verify OTP
 */
const verifyOTP = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { phoneNumber, otpCode, verificationId } = req.body;
    const result = yield otpService_1.OTPService.verifyOTP(phoneNumber, otpCode, verificationId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Phone number verified successfully',
        data: result,
    });
}));
/**
 * Resend OTP
 */
const resendOTP = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { verificationId } = req.body;
    const ipAddress = req.ip || req.connection.remoteAddress;
    const userAgent = req.get('User-Agent');
    const result = yield otpService_1.OTPService.resendOTP(verificationId, ipAddress, userAgent);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'OTP resent successfully',
        data: result,
    });
}));
/**
 * Check verification status
 */
const checkVerificationStatus = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { verificationId } = req.params;
    // Basic validation for verification ID
    if (!verificationId || verificationId.trim() === '') {
        res.status(400).json({
            success: false,
            message: 'Verification ID is required',
        });
        return;
    }
    const result = yield otpService_1.OTPService.checkVerificationStatus(verificationId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Verification status retrieved',
        data: result,
    });
}));
/**
 * Cleanup expired OTPs and rate limits (admin endpoint)
 */
const cleanupExpiredOTPs = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield otpService_1.OTPService.cleanupExpiredRecords();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Cleanup completed successfully',
        data: {
            otpRecords: result.otpRecords,
            rateLimitRecords: result.rateLimitRecords,
            totalDeleted: result.total,
        },
    });
}));
exports.OTPController = {
    sendOTP,
    verifyOTP,
    resendOTP,
    checkVerificationStatus,
    cleanupExpiredOTPs,
};
