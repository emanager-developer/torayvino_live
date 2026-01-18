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
exports.getFaqCategoriesController = exports.deleteFaqController = exports.updateFaqController = exports.getSingleFaqController = exports.getAllFaqForAdminController = exports.getAllFaqController = exports.addFaqController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = require("../../../utils/catchAsync");
const faqService_1 = require("./faqService");
exports.addFaqController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, faqService_1.addFaqService)(req.body);
    res.status(http_status_1.default.OK).json({
        success: true,
        message: 'FAQ added successfully',
        data: result,
    });
}));
exports.getAllFaqController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, faqService_1.getAllFaqService)();
    res.status(http_status_1.default.OK).json({
        success: true,
        message: 'FAQs retrieved successfully',
        data: result,
    });
}));
exports.getAllFaqForAdminController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, faqService_1.getAllFaqForAdminService)();
    res.status(http_status_1.default.OK).json({
        success: true,
        message: 'FAQs retrieved successfully',
        data: result,
    });
}));
exports.getSingleFaqController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield (0, faqService_1.getSingleFaqService)(id);
    res.status(http_status_1.default.OK).json({
        success: true,
        message: 'FAQ retrieved successfully',
        data: result,
    });
}));
exports.updateFaqController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield (0, faqService_1.updateFaqService)(id, req.body);
    res.status(http_status_1.default.OK).json({
        success: true,
        message: 'FAQ updated successfully',
        data: result,
    });
}));
exports.deleteFaqController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield (0, faqService_1.deleteFaqService)(id);
    res.status(http_status_1.default.OK).json({
        success: true,
        message: 'FAQ deleted successfully',
        data: result,
    });
}));
exports.getFaqCategoriesController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, faqService_1.getFaqCategoriesService)();
    res.status(http_status_1.default.OK).json({
        success: true,
        message: 'FAQ categories retrieved successfully',
        data: result,
    });
}));
