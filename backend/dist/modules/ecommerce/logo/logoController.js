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
exports.updateLogo = exports.getLogo = exports.addLogo = void 0;
const logoService_1 = require("./logoService");
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = require("../../../utils/catchAsync");
const AppError_1 = __importDefault(require("../../../errors/AppError"));
const deleteFile_1 = require("../../../utils/deleteFile");
exports.addLogo = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const logo = (_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.filename;
    if (!logo)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Logo is required !');
    const data = { logo: `/logo/${logo}` };
    try {
        const result = yield (0, logoService_1.addLogoService)(data);
        res.status(200).json({
            success: true,
            message: 'Logo add successfully',
            data: result,
        });
    }
    catch (error) {
        (0, deleteFile_1.deleteFile)(`./uploads/logo/${logo}`);
        next(error);
    }
}));
exports.getLogo = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, logoService_1.getLogoService)();
    res.status(200).json({
        success: true,
        message: 'Logo get successfully',
        data: result,
    });
}));
exports.updateLogo = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const logo = (_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.filename;
    const id = req.params.id;
    if (!logo)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Logo is required !');
    const data = {
        logo: `/logo/${logo}`,
    };
    try {
        const result = yield (0, logoService_1.updateLogoService)(data, id);
        res.status(200).json({
            success: true,
            message: 'Logo update successfully',
            data: result,
        });
    }
    catch (error) {
        (0, deleteFile_1.deleteFile)(`./uploads/logo/${logo}`);
        next(error);
    }
}));
