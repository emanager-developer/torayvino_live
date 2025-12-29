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
exports.verifyPermission = void 0;
const config_1 = __importDefault(require("../config"));
const userModel_1 = require("../modules/user/userModel");
const createToken_1 = require("../utils/createToken");
const AppError_1 = __importDefault(require("../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = require("../utils/catchAsync");
const verifyPermission = (route, action) => {
    return (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c;
        const token = (_b = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.split(' ')[1];
        // checking if the token is missing
        if (!token) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized! missing token');
        }
        // checking if the given token is valid
        let decoded;
        try {
            decoded = (0, createToken_1.verifyToken)(token, config_1.default.JWT_ACCESS_SECRET);
        }
        catch (_d) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized! invalid token');
        }
        const { role, _id } = decoded;
        // checking if the user is exist
        const user = (yield userModel_1.User.findById(_id).populate('rolePermission'));
        // checking superAdmin
        if (role === 'superAdmin')
            return next();
        if (!user) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This user is not found !');
        }
        // checking if the user status
        const isDeleted = user === null || user === void 0 ? void 0 : user.isDeleted;
        if (isDeleted) {
            throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'This user is delete !');
        }
        // checking status
        const status = user === null || user === void 0 ? void 0 : user.status;
        if (status === 'blocked') {
            throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'This user is blocked !');
        }
        const permissions = (_c = user === null || user === void 0 ? void 0 : user.rolePermission) === null || _c === void 0 ? void 0 : _c.permissions;
        // checking if the user has permission
        const permission = permissions === null || permissions === void 0 ? void 0 : permissions.find((perm) => (perm === null || perm === void 0 ? void 0 : perm.route) === route);
        if (!permission || !permission[action]) {
            throw new AppError_1.default(http_status_1.default.FORBIDDEN, `You do not have permission to ${action} on ${route} route`);
        }
        next();
    }));
};
exports.verifyPermission = verifyPermission;
