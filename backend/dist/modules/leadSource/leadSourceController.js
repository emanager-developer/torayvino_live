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
exports.deleteLeadSourceController = exports.updateLeadSourceController = exports.getLeadSourceByIdController = exports.getAllLeadSourceController = exports.createLeadSourceController = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const catchAsync_1 = require("../../utils/catchAsync");
const http_status_1 = __importDefault(require("http-status"));
const leadSourceService_1 = require("./leadSourceService");
exports.createLeadSourceController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, leadSourceService_1.createLeadSourceService)(req.body);
    res.status(200).json({
        success: true,
        message: 'Lead Source add successfully',
        data: result,
    });
}));
exports.getAllLeadSourceController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, leadSourceService_1.getAllLeadSourceService)();
    res.status(200).json({
        success: true,
        message: 'Lead Source get successfully',
        data: result,
    });
}));
exports.getLeadSourceByIdController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, leadSourceService_1.getLeadSourceByIdService)(req.params.id);
    if (!result)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Service not found');
    res.status(200).json({
        success: true,
        message: 'Lead Source get successfully',
        data: result,
    });
}));
exports.updateLeadSourceController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, leadSourceService_1.updateLeadSourceService)(req.params.id, req.body);
    res.status(200).json({
        success: true,
        message: 'Lead Source update successfully',
        data: result,
    });
}));
exports.deleteLeadSourceController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield (0, leadSourceService_1.deleteLeadSourceService)(id);
    res.status(200).json({
        success: true,
        message: 'Lead Source deleted successfully',
    });
}));
