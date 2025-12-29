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
exports.updateSettingController = exports.getSettingController = exports.createSettingController = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const catchAsync_1 = require("../../utils/catchAsync");
const deleteFile_1 = require("../../utils/deleteFile");
const settingService_1 = require("./settingService");
const http_status_1 = __importDefault(require("http-status"));
exports.createSettingController = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const favicon = (_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.filename;
    if (!favicon)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'image is required !');
    const data = Object.assign(Object.assign({}, req.body), { favicon: `/setting/${favicon}` });
    try {
        const result = yield (0, settingService_1.createSettingService)(data);
        res.status(200).json({
            success: true,
            message: 'Setting add successfully',
            data: result,
        });
    }
    catch (error) {
        if (favicon)
            (0, deleteFile_1.deleteFile)(`/setting/${favicon}`);
        next(error);
    }
}));
exports.getSettingController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, settingService_1.getSettingService)();
    res.status(200).json({
        success: true,
        message: 'Setting get successfully',
        data: result,
    });
}));
exports.updateSettingController = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const favicon = (_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.filename;
    const data = Object.assign(Object.assign({}, req.body), { favicon: favicon ? `/setting/${favicon}` : undefined });
    try {
        const result = yield (0, settingService_1.updateSettingService)(req.params.id, data);
        res.status(200).json({
            success: true,
            message: 'Setting update successfully',
            data: result,
        });
    }
    catch (error) {
        if (favicon)
            (0, deleteFile_1.deleteFile)(`/setting/${favicon}`);
        next(error);
    }
}));
