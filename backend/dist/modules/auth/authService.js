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
exports.refreshTokenService = exports.loginUserService = void 0;
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const createToken_1 = require("../../utils/createToken");
const userModel_1 = require("../user/userModel");
const http_status_1 = __importDefault(require("http-status"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const loginUserService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // checking if the user is exist
    const user = yield userModel_1.User.findOne({ email: payload === null || payload === void 0 ? void 0 : payload.email }).select('+password');
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This user is not found !');
    }
    // checking if the user is blocked
    const isDeleted = user === null || user === void 0 ? void 0 : user.isDeleted;
    if (isDeleted) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'This user is delete !');
    }
    //checking if the password is correct
    const isMatch = yield bcrypt_1.default.compare(payload === null || payload === void 0 ? void 0 : payload.password, user === null || user === void 0 ? void 0 : user.password);
    if (!isMatch)
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'Password do not matched');
    //create token and sent to the client
    const jwtPayload = {
        _id: user === null || user === void 0 ? void 0 : user._id,
        email: user === null || user === void 0 ? void 0 : user.email,
        name: user === null || user === void 0 ? void 0 : user.name,
        role: user === null || user === void 0 ? void 0 : user.role,
        employeeId: user === null || user === void 0 ? void 0 : user.employee,
    };
    const accessToken = (0, createToken_1.createToken)(jwtPayload, config_1.default.JWT_ACCESS_SECRET, config_1.default.JWT_ACCESS_EXPIRES_IN);
    const refreshToken = (0, createToken_1.createToken)(jwtPayload, config_1.default.JWT_REFRESH_SECRET, config_1.default.JWT_REFRESH_EXPIRES_IN);
    return {
        accessToken,
        refreshToken,
    };
});
exports.loginUserService = loginUserService;
const refreshTokenService = (token) => __awaiter(void 0, void 0, void 0, function* () {
    // checking if the given token is valid
    const decoded = (0, createToken_1.verifyToken)(token, config_1.default.JWT_REFRESH_SECRET);
    const { email } = decoded;
    // checking if the user is exist
    const user = yield userModel_1.User.findOne({ email });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This user is not found !');
    }
    // checking if the user is blocked
    const isDeleted = user === null || user === void 0 ? void 0 : user.isDeleted;
    if (isDeleted) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'This user is blocked ! !');
    }
    const jwtPayload = {
        _id: user === null || user === void 0 ? void 0 : user._id,
        email: user === null || user === void 0 ? void 0 : user.email,
        name: user === null || user === void 0 ? void 0 : user.name,
        role: user === null || user === void 0 ? void 0 : user.role,
        employeeId: user === null || user === void 0 ? void 0 : user.employee,
    };
    const accessToken = (0, createToken_1.createToken)(jwtPayload, config_1.default.JWT_ACCESS_SECRET, config_1.default.JWT_ACCESS_EXPIRES_IN);
    return {
        accessToken,
    };
});
exports.refreshTokenService = refreshTokenService;
