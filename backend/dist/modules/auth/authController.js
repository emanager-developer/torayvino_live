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
exports.refreshTokenController = exports.loginUserController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const authService_1 = require("./authService");
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../config"));
exports.loginUserController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, authService_1.loginUserService)(req.body);
    const { refreshToken, accessToken } = result;
    res.cookie('refreshToken', refreshToken, {
        secure: config_1.default.NODE_ENV === 'production' ? true : false,
        httpOnly: true,
        sameSite: config_1.default.NODE_ENV === 'production' ? 'none' : 'lax',
    });
    res.status(200).json({
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'User is logged in successfully!',
        data: {
            accessToken,
        },
    });
}));
exports.refreshTokenController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.cookies;
    const result = yield (0, authService_1.refreshTokenService)(refreshToken);
    res.status(200).json({
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Token refreshed successfully',
        data: result,
    });
}));
