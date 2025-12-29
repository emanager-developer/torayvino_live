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
exports.trueTaskIsShowController = exports.deleteTaskController = exports.updateTaskController = exports.getByIdTaskController = exports.getAllTaskController = exports.createTaskController = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const catchAsync_1 = require("../../utils/catchAsync");
const http_status_1 = __importDefault(require("http-status"));
const taskService_1 = require("./taskService");
exports.createTaskController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, taskService_1.createTaskService)(req.body);
    res.status(200).json({
        success: true,
        message: 'Task add successfully',
        data: result,
    });
}));
exports.getAllTaskController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { meta, data } = yield (0, taskService_1.getAllTaskService)(req.query);
    res.status(200).json({
        success: true,
        message: 'Task get successfully',
        meta,
        data,
    });
}));
exports.getByIdTaskController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, taskService_1.getByIdTaskService)(req.params.id);
    if (!result)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Service not found');
    res.status(200).json({
        success: true,
        message: 'Task get successfully',
        data: result,
    });
}));
exports.updateTaskController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, taskService_1.updateTaskService)(req.params.id, req.body);
    res.status(200).json({
        success: true,
        message: 'Task update successfully',
        data: result,
    });
}));
exports.deleteTaskController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield (0, taskService_1.deleteTaskService)(id);
    res.status(200).json({
        success: true,
        message: 'Task deleted successfully',
    });
}));
exports.trueTaskIsShowController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, taskService_1.trueTaskIsShowService)(req.params.id);
    res.status(200).json({
        success: true,
        message: 'Task update successfully',
        data: result,
    });
}));
