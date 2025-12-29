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
exports.updateNotificationController = exports.getActivityNotificationController = exports.deleteActivityController = exports.updateActivityController = exports.getActivityByIdController = exports.getAllActivityController = exports.createActivityController = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const catchAsync_1 = require("../../utils/catchAsync");
const http_status_1 = __importDefault(require("http-status"));
const activityService_1 = require("./activityService");
exports.createActivityController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, activityService_1.createActivityService)(req.body);
    res.status(200).json({
        success: true,
        message: 'Activity add successfully',
        data: result,
    });
}));
exports.getAllActivityController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { meta, data } = yield (0, activityService_1.getAllActivityService)(req.query);
    res.status(200).json({
        success: true,
        message: 'Activity get successfully',
        meta,
        data,
    });
}));
exports.getActivityByIdController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, activityService_1.getServiceByIdService)(req.params.id);
    if (!result)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Service not found');
    res.status(200).json({
        success: true,
        message: 'Activity get successfully',
        data: result,
    });
}));
exports.updateActivityController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, activityService_1.updateActivityService)(req.params.id, req.body);
    res.status(200).json({
        success: true,
        message: 'Activity update successfully',
        data: result,
    });
}));
exports.deleteActivityController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield (0, activityService_1.deleteActivityService)(id);
    res.status(200).json({
        success: true,
        message: 'Activity deleted successfully',
    });
}));
exports.getActivityNotificationController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, activityService_1.getActivityNotificationService)();
    res.status(200).json({
        success: true,
        message: 'Activity notifications get successfully',
        data: result,
    });
}));
exports.updateNotificationController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield (0, activityService_1.updateNotificationService)(id);
    res.status(200).json({
        success: true,
        message: 'Activity notification updated successfully',
        data: result,
    });
}));
