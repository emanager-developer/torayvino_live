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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateReviewController = exports.deleteReviewController = exports.getAllReviewController = exports.addReviewController = void 0;
const catchAsync_1 = require("../../../utils/catchAsync");
const reviewService_1 = require("./reviewService");
exports.addReviewController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, reviewService_1.addReviewService)(req.body);
    res.status(200).json({
        success: true,
        message: 'Review added successfully',
        data: result,
    });
}));
exports.getAllReviewController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { meta, data } = yield (0, reviewService_1.getAllReviewService)(req.query);
    res.status(200).json({
        success: true,
        message: 'Review added successfully',
        meta,
        data,
    });
}));
exports.deleteReviewController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = req.body;
    yield (0, reviewService_1.deleteReviewService)(id, data);
    res.status(200).json({
        success: true,
        message: 'Review deleted successfully',
    });
}));
exports.updateReviewController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = req.body;
    yield (0, reviewService_1.updateReviewService)(id, data);
    res.status(200).json({
        success: true,
        message: 'Review updated successfully',
    });
}));
