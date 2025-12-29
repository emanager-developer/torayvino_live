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
exports.sendSMSController = exports.sendEmailController = exports.updateCustomerActiveController = exports.updateCustomerImageController = exports.updateCustomerProfileController = exports.resetCustomerPasswordController = exports.updateCustomerPasswordController = exports.verifyPhoneAndRegisterController = exports.getCustomerByPhoneController = exports.getByIdCustomerController = exports.getAllCustomerController = exports.loginCustomerController = exports.registerCustomerController = exports.addCustomerController = void 0;
const config_1 = __importDefault(require("../../config"));
const catchAsync_1 = require("../../utils/catchAsync");
const customerService_1 = require("./customerService");
const http_status_1 = __importDefault(require("http-status"));
const deleteFile_1 = require("../../utils/deleteFile");
const AppError_1 = __importDefault(require("../../errors/AppError"));
exports.addCustomerController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, customerService_1.addCustomerService)(req.body);
    res.status(http_status_1.default.OK).json({
        success: true,
        message: 'Customer add successfully',
        data: result,
    });
}));
exports.registerCustomerController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, customerService_1.registerCustomerService)(req.body);
    res.status(200).json({
        success: true,
        message: 'Customer registered successfully',
        data: result,
    });
}));
exports.loginCustomerController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, customerService_1.loginCustomerService)(req.body);
    const { refreshToken, accessToken } = result;
    res.cookie('refreshToken', refreshToken, {
        secure: config_1.default.NODE_ENV === 'production' ? true : false,
        httpOnly: true,
        sameSite: config_1.default.NODE_ENV === 'production' ? 'none' : 'lax',
    });
    res.status(200).json({
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Customer is login successfully!',
        data: {
            accessToken,
        },
    });
}));
exports.getAllCustomerController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { meta, data } = yield (0, customerService_1.getAllCustomerService)(req.query);
    res.status(200).json({
        success: true,
        message: 'Customers get successfully',
        meta,
        data,
    });
}));
exports.getByIdCustomerController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, customerService_1.getByIdCustomerService)(req.params.id);
    res.status(200).json({
        success: true,
        message: 'Customer get successfully',
        data: result,
    });
}));
exports.getCustomerByPhoneController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { phone } = req.params;
    const result = yield (0, customerService_1.getCustomerByPhoneService)(phone);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Customer not found');
    }
    res.status(200).json({
        success: true,
        message: 'Customer retrieved successfully',
        data: result,
    });
}));
exports.verifyPhoneAndRegisterController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, customerService_1.verifyPhoneAndRegisterService)(req.body);
    res.status(200).json({
        success: true,
        message: 'Customer registered successfully with phone verification',
        data: result,
    });
}));
exports.updateCustomerPasswordController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;
    // eslint-disable-next-line no-console
    console.log(req.body);
    yield (0, customerService_1.updateCustomerPasswordService)(id, { oldPassword, newPassword });
    res.status(200).json({
        success: true,
        message: 'Customer password updated successfully',
    });
}));
exports.resetCustomerPasswordController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { phone, verificationId, newPassword } = req.body;
    if (!phone || !verificationId || !newPassword) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'phone, verificationId and newPassword are required');
    }
    yield (0, customerService_1.resetCustomerPasswordService)({ phone, verificationId, newPassword });
    res.status(200).json({
        success: true,
        message: 'Customer password reset successfully',
    });
}));
exports.updateCustomerProfileController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const { id } = req.params;
    const rawPayload = (_c = (_b = (_a = req.body) === null || _a === void 0 ? void 0 : _a.data) !== null && _b !== void 0 ? _b : req.body) !== null && _c !== void 0 ? _c : {};
    // Whitelist allowed updatable fields
    const allowed = ['name', 'phone', 'email', 'address', 'note', 'priority'];
    const updatePayload = {};
    for (const key of allowed) {
        if (rawPayload[key] !== undefined)
            updatePayload[key] = rawPayload[key];
    }
    const result = yield (0, customerService_1.updateCustomerProfileService)(id, updatePayload);
    res.status(200).json({
        success: true,
        message: 'Customer profile updated successfully',
        yourupdate: updatePayload,
        data: result,
    });
}));
exports.updateCustomerImageController = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    const image = (_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.filename;
    if (!image)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Image is required !');
    const result = yield (0, customerService_1.updateCustomerImageService)(id, image);
    try {
        res.status(200).json({
            success: true,
            message: 'Customer image updated successfully',
            data: result,
        });
    }
    catch (error) {
        if (image) {
            (0, deleteFile_1.deleteFile)(image);
        }
        next(error);
    }
}));
exports.updateCustomerActiveController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { isActive } = req.body;
    const result = yield (0, customerService_1.updateCustomerActiveService)(id, { isActive });
    res.status(200).json({
        success: true,
        message: 'Customer status updated successfully',
        data: result,
    });
}));
exports.sendEmailController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, customerService_1.sendEmailService)(req.body);
    res.status(200).json({
        success: true,
        message: 'Email sent successfully',
        data: result,
    });
}));
exports.sendSMSController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, customerService_1.sendSMSService)(req.body);
    res.status(200).json({
        success: true,
        message: 'SMS sent successfully',
        data: result,
    });
}));
