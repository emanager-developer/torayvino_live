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
exports.updateFlashDealController = exports.deleteFlashDealController = exports.updateFlashDealstatusController = exports.getFlashDealByIdController = exports.getActiveFlashDealController = exports.getAllFlashDealController = exports.addFlashDealController = void 0;
const catchAsync_1 = require("../../../utils/catchAsync");
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../../errors/AppError"));
const flashDealService_1 = require("./flashDealService");
exports.addFlashDealController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, flashDealService_1.addFlashDealService)(req.body);
    res.status(http_status_1.default.OK).json({
        success: true,
        message: 'flash Deal add success',
        data: result,
    });
}));
exports.getAllFlashDealController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, flashDealService_1.getAllFlashDealService)();
    res.status(http_status_1.default.OK).json({
        success: true,
        message: 'flash Deal get success',
        data: result,
    });
}));
exports.getActiveFlashDealController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, flashDealService_1.getActiveFlashDealService)();
    res.status(http_status_1.default.OK).json({
        success: true,
        message: 'flash Deal get success',
        data: result,
    });
}));
exports.getFlashDealByIdController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield (0, flashDealService_1.getFlashDealByIdService)(id);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Flash Deal not found');
    }
    res.status(http_status_1.default.OK).json({
        success: true,
        message: 'flash Deal get success',
        data: result,
    });
}));
exports.updateFlashDealstatusController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield (0, flashDealService_1.toggleFlashDealStatusService)(id);
    res.status(http_status_1.default.OK).json({
        success: true,
        message: 'flash Deal status update success',
    });
}));
exports.deleteFlashDealController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield (0, flashDealService_1.deleteFlashDealService)(id);
    res.status(http_status_1.default.OK).json({
        success: true,
        message: 'FlashDeal delete success',
    });
}));
exports.updateFlashDealController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield (0, flashDealService_1.updateFlashDealService)(id, req.body);
    res.status(http_status_1.default.OK).json({
        success: true,
        message: 'FlashDeal update success',
    });
}));
