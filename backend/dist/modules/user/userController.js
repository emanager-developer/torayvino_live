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
exports.bulkBackUserController = exports.resetAdminPasswordController = exports.verifyAdminResetEmailOTPController = exports.sendAdminResetEmailOTPController = exports.updatePasswordController = exports.updateProfileController = exports.deleteUserController = exports.updateUserController = exports.getSingleUserController = exports.getAllUserController = exports.addUserController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const userService_1 = require("./userService");
const userService_2 = require("./userService");
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
exports.addUserController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, userService_1.addUserService)(req.body);
    res.status(200).json({
        success: true,
        message: 'User add successfully',
        data: result,
    });
}));
exports.getAllUserController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { meta, data } = yield (0, userService_1.getAllUserService)(req.query);
    res.status(200).json({
        success: true,
        message: 'User get successfully',
        meta,
        data,
    });
}));
exports.getSingleUserController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, userService_1.getSingleUserService)(req.params.id);
    res.status(200).json({
        success: true,
        message: 'User get successfully',
        data: result,
    });
}));
exports.updateUserController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const id = req.params.id;
    const result = yield (0, userService_1.updateUserService)(id, data);
    res.status(200).json({
        success: true,
        message: 'User update successfully',
        data: result,
    });
}));
exports.deleteUserController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    yield (0, userService_1.deleteUserService)(id, req.body.user);
    res.status(200).json({
        success: true,
        message: 'User delete successfully',
    });
}));
exports.updateProfileController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const id = req.params.id;
    const result = yield (0, userService_1.updateProfileService)(id, data);
    res.status(200).json({
        success: true,
        message: 'Profile update successfully',
        data: result,
    });
}));
exports.updatePasswordController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const id = req.params.id;
    const result = yield (0, userService_1.updatePasswordService)(id, body);
    res.status(200).json({
        success: true,
        message: 'Password update successfully',
        data: result,
    });
}));
exports.sendAdminResetEmailOTPController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const ipAddress = req.ip || req.connection.remoteAddress;
    const userAgent = req.get('User-Agent');
    const result = yield (0, userService_2.sendAdminResetEmailOTPService)(email, ipAddress, userAgent);
    res.status(200).json({
        success: true,
        message: 'OTP sent to email',
        data: result,
    });
}));
exports.verifyAdminResetEmailOTPController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, otpCode, verificationId } = req.body;
    const result = yield (0, userService_2.verifyAdminResetEmailOTPService)(email, otpCode, verificationId);
    res.status(200).json({
        success: true,
        message: 'Email verified',
        data: result,
    });
}));
exports.resetAdminPasswordController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, verificationId, newPassword } = req.body;
    if (!email || !verificationId || !newPassword) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'email, verificationId and newPassword are required');
    }
    yield (0, userService_2.resetAdminPasswordByEmailService)({ email, verificationId, newPassword });
    res.status(200).json({
        success: true,
        message: 'Admin password reset successfully',
    });
}));
exports.bulkBackUserController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ids = req.body.ids;
    const result = yield (0, userService_1.bulkBackUserService)(ids);
    res.status(200).json({
        success: true,
        message: 'Users back successfully',
        data: result,
    });
}));
