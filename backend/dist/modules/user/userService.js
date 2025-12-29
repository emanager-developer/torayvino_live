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
exports.resetAdminPasswordByEmailService = exports.verifyAdminResetEmailOTPService = exports.sendAdminResetEmailOTPService = exports.bulkBackUserService = exports.updatePasswordService = exports.updateProfileService = exports.deleteUserService = exports.updateUserService = exports.getSingleUserService = exports.getAllUserService = exports.addUserService = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const userModel_1 = require("./userModel");
const roleModel_1 = require("../role/roleModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const QueryBuilder_1 = __importDefault(require("../../builders/QueryBuilder"));
const crypto_1 = __importDefault(require("crypto"));
const otpVerificationModel_1 = __importDefault(require("../otp/otpVerificationModel"));
const sendEmail_1 = require("../../utils/sendEmail");
const addUserService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const isRoleExist = yield roleModel_1.Role.findOne({ _id: data === null || data === void 0 ? void 0 : data.role });
    if (!isRoleExist)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Role not found!');
    const newData = Object.assign(Object.assign({}, data), { role: isRoleExist === null || isRoleExist === void 0 ? void 0 : isRoleExist.name, rolePermission: data === null || data === void 0 ? void 0 : data.role });
    const result = yield userModel_1.User.create(newData);
    return result;
});
exports.addUserService = addUserService;
const getAllUserService = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const userQuery = new QueryBuilder_1.default(userModel_1.User.find().populate('deletedBy employee', 'name'), query)
        .search(['name', 'email'])
        .filter()
        .sort()
        .paginate()
        .fields();
    const meta = yield userQuery.countTotal();
    const data = yield userQuery.modelQuery;
    return {
        meta,
        data,
    };
});
exports.getAllUserService = getAllUserService;
const getSingleUserService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userModel_1.User.findById(id).populate('employee', 'name');
    return result;
});
exports.getSingleUserService = getSingleUserService;
const updateUserService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield userModel_1.User.findById(id);
    if (!isExist)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found!');
    const isRoleExist = yield roleModel_1.Role.findOne({ _id: data === null || data === void 0 ? void 0 : data.role });
    if (!isRoleExist)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Role not found!');
    const newData = Object.assign(Object.assign({}, data), { role: isRoleExist === null || isRoleExist === void 0 ? void 0 : isRoleExist.name, rolePermission: data === null || data === void 0 ? void 0 : data.role });
    const result = yield userModel_1.User.findByIdAndUpdate(id, newData, { new: true });
    return result;
});
exports.updateUserService = updateUserService;
const deleteUserService = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield userModel_1.User.findById(id);
    if (!isExist)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found!');
    if ((isExist === null || isExist === void 0 ? void 0 : isExist.role) === 'superAdmin')
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'You cannot delete Super Admin user!');
    const result = yield userModel_1.User.findByIdAndUpdate(id, { isDeleted: true, deletedBy: user }, { new: true });
    return result;
});
exports.deleteUserService = deleteUserService;
const updateProfileService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield userModel_1.User.findById(id);
    if (!isExist)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found!');
    const result = yield userModel_1.User.findByIdAndUpdate(id, data, { new: true });
    return result;
});
exports.updateProfileService = updateProfileService;
const updatePasswordService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield userModel_1.User.findById(id).select('+password');
    if (!isExist)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found!');
    const { oldPassword, newPassword } = data || {};
    if (!oldPassword || !newPassword)
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Both oldPassword and newPassword are required..');
    // Ensure password was loaded from DB (in case user was created without a password or select failed)
    const existingHash = isExist.password;
    if (!existingHash)
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Stored password not available for this user');
    const isMatch = yield bcrypt_1.default.compare(oldPassword, existingHash);
    if (!isMatch)
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'Old password does not match');
    const salt = yield bcrypt_1.default.genSalt(10);
    const hashPassword = yield bcrypt_1.default.hash(newPassword, salt);
    const newData = { password: hashPassword };
    const result = yield userModel_1.User.findByIdAndUpdate(id, newData, { new: true });
    return result;
});
exports.updatePasswordService = updatePasswordService;
const bulkBackUserService = (ids) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userModel_1.User.updateMany({ _id: { $in: ids } }, { $set: { isDeleted: false } });
    return result;
});
exports.bulkBackUserService = bulkBackUserService;
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();
const hashOTP = (otp) => __awaiter(void 0, void 0, void 0, function* () {
    const saltRounds = 10;
    return yield bcrypt_1.default.hash(otp, saltRounds);
});
const sendAdminResetEmailOTPService = (email, ipAddress, userAgent) => __awaiter(void 0, void 0, void 0, function* () {
    // ensure user exists and is admin/superAdmin
    const user = yield userModel_1.User.findOne({ email });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Admin user with this email not found');
    }
    // generate otp and verification id
    const otpCode = generateOTP();
    const verificationId = `verify_email_${Date.now()}_${crypto_1.default.randomBytes(6).toString('hex')}`;
    const hashed = yield hashOTP(otpCode);
    // expire any previous unverified records for this email
    yield otpVerificationModel_1.default.updateMany({ email, isVerified: false, isExpired: false }, { isExpired: true });
    // save new verification record (expiresAt pre-save sets 5 minutes)
    yield otpVerificationModel_1.default.create({
        verificationId,
        email,
        otpCodeHash: hashed,
        ipAddress,
        userAgent,
    });
    // send email
    yield (0, sendEmail_1.verifyEmailSend)(email, otpCode);
    // For development, return otp in response; in production need to omit it
    return { verificationId, expiresIn: 5 * 60, developmentOTP: otpCode };
});
exports.sendAdminResetEmailOTPService = sendAdminResetEmailOTPService;
const verifyAdminResetEmailOTPService = (email, otpCode, verificationId) => __awaiter(void 0, void 0, void 0, function* () {
    const verification = yield otpVerificationModel_1.default.findOne({
        verificationId,
        email,
        isVerified: false,
        isExpired: false,
    });
    if (!verification)
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Invalid verification ID or email');
    if (verification.expiresAt < new Date()) {
        verification.isExpired = true;
        yield verification.save();
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'OTP has expired. Please request a new one.');
    }
    // check attempts
    if (verification.attempts >= verification.maxAttempts) {
        verification.isExpired = true;
        yield verification.save();
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Maximum attempts exceeded. Please request a new OTP.');
    }
    verification.attempts += 1;
    yield verification.save();
    const isValid = yield bcrypt_1.default.compare(otpCode, verification.otpCodeHash);
    if (!isValid) {
        const remaining = verification.maxAttempts - verification.attempts;
        if (remaining <= 0) {
            verification.isExpired = true;
            yield verification.save();
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Invalid OTP. Maximum attempts exceeded.');
        }
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, `Invalid OTP. ${remaining} attempts remaining.`);
    }
    verification.isVerified = true;
    verification.verifiedAt = new Date();
    yield verification.save();
    const tempToken = crypto_1.default.randomBytes(32).toString('hex');
    return { verified: true, verificationId, tempToken };
});
exports.verifyAdminResetEmailOTPService = verifyAdminResetEmailOTPService;
const resetAdminPasswordByEmailService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, verificationId, newPassword } = data;
    const verification = yield otpVerificationModel_1.default.findOne({
        verificationId,
        email,
        isVerified: true,
        isExpired: false,
    });
    if (!verification)
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Email not verified or verification expired');
    // check verification age (24h)
    if (!verification.verifiedAt)
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Invalid verification record');
    const hoursDiff = (Date.now() - verification.verifiedAt.getTime()) / (1000 * 60 * 60);
    if (hoursDiff > 24)
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Verification expired. Please verify again');
    const user = yield userModel_1.User.findOne({ email }).select('+password');
    if (!user)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Admin user not found');
    user.password = newPassword;
    yield user.save();
    // expire verification
    yield otpVerificationModel_1.default.updateOne({ verificationId }, { isExpired: true });
    return true;
});
exports.resetAdminPasswordByEmailService = resetAdminPasswordByEmailService;
