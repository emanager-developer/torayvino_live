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
exports.deletePopup = exports.togglePopupStatus = exports.updatePopup = exports.getPopupById = exports.getActivePopup = exports.getPopups = exports.addPopup = void 0;
const popupService_1 = require("./popupService");
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = require("../../../utils/catchAsync");
const AppError_1 = __importDefault(require("../../../errors/AppError"));
const deleteFile_1 = require("../../../utils/deleteFile");
exports.addPopup = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const image = (_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.filename;
    if (!image)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Popup image is required!');
    const { title, description, isActive } = req.body;
    const data = {
        image: `/popup/${image}`,
        title: title || '',
        description: description || '',
        isActive: isActive === 'true' || isActive === true || false,
    };
    try {
        const result = yield (0, popupService_1.addPopupService)(data);
        res.status(200).json({
            success: true,
            message: 'Popup created successfully',
            data: result,
        });
    }
    catch (error) {
        (0, deleteFile_1.deleteFile)(`./uploads/popup/${image}`);
        next(error);
    }
}));
exports.getPopups = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, popupService_1.getPopupsService)();
    res.status(200).json({
        success: true,
        message: 'Popups retrieved successfully',
        data: result,
    });
}));
exports.getActivePopup = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, popupService_1.getActivePopupService)();
    res.status(200).json({
        success: true,
        message: 'Active popup retrieved successfully',
        data: result,
    });
}));
exports.getPopupById = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield (0, popupService_1.getPopupByIdService)(id);
    res.status(200).json({
        success: true,
        message: 'Popup retrieved successfully',
        data: result,
    });
}));
exports.updatePopup = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const image = (_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.filename;
    const id = req.params.id;
    const { title, description, isActive } = req.body;
    const data = Object.assign({ title,
        description, isActive: isActive === 'true' || isActive === true }, (image && { image: `/popup/${image}` }));
    try {
        const result = yield (0, popupService_1.updatePopupService)(data, id);
        res.status(200).json({
            success: true,
            message: 'Popup updated successfully',
            data: result,
        });
    }
    catch (error) {
        if (image) {
            (0, deleteFile_1.deleteFile)(`./uploads/popup/${image}`);
        }
        next(error);
    }
}));
exports.togglePopupStatus = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield (0, popupService_1.togglePopupStatusService)(id);
    res.status(200).json({
        success: true,
        message: `Popup ${(result === null || result === void 0 ? void 0 : result.isActive) ? 'activated' : 'deactivated'} successfully`,
        data: result,
    });
}));
exports.deletePopup = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield (0, popupService_1.deletePopupService)(id);
    res.status(200).json({
        success: true,
        message: 'Popup deleted successfully',
        data: result,
    });
}));
