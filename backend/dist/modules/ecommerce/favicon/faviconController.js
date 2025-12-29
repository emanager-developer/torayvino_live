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
exports.updateFavicon = exports.getFavicon = exports.addFavicon = void 0;
const faviconService_1 = require("./faviconService");
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = require("../../../utils/catchAsync");
const AppError_1 = __importDefault(require("../../../errors/AppError"));
const deleteFile_1 = require("../../../utils/deleteFile");
exports.addFavicon = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const favicon = (_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.filename;
    if (!favicon)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Favicon is required !');
    const data = { favicon: `/favicon/${favicon}` };
    try {
        const result = yield (0, faviconService_1.addFaviconService)(data);
        res.status(200).json({
            success: true,
            message: 'Favicon add successfully',
            data: result,
        });
    }
    catch (error) {
        (0, deleteFile_1.deleteFile)(`./uploads/favicon/${favicon}`);
        next(error);
    }
}));
exports.getFavicon = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, faviconService_1.getFaviconService)();
    res.status(200).json({
        success: true,
        message: 'Favicon get successfully',
        data: result,
    });
}));
exports.updateFavicon = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const favicon = (_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.filename;
    const id = req.params.id;
    if (!favicon)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Favicon is required !');
    const data = { favicon: `/favicon/${favicon}` };
    try {
        const result = yield (0, faviconService_1.updateFaviconService)(data, id);
        res.status(200).json({
            success: true,
            message: 'Favicon update successfully',
            data: result,
        });
    }
    catch (error) {
        (0, deleteFile_1.deleteFile)(`./uploads/favicon/${favicon}`);
        next(error);
    }
}));
