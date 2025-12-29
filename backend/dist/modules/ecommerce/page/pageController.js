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
exports.deletePageController = exports.updatePageController = exports.getSinglePageController = exports.getAllPageController = exports.addPageController = void 0;
const catchAsync_1 = require("../../../utils/catchAsync");
const pageService_1 = require("./pageService");
exports.addPageController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, pageService_1.addPageService)(req.body);
    res.status(200).json({
        success: true,
        message: 'Page add successfully',
        data: result,
    });
}));
exports.getAllPageController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, pageService_1.getAllPageService)();
    res.status(200).json({
        success: true,
        message: 'Pages get successfully',
        data: result,
    });
}));
exports.getSinglePageController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield (0, pageService_1.getSinglePageService)(id);
    res.status(200).json({
        success: true,
        message: 'Page get successfully',
        data: result,
    });
}));
exports.updatePageController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield (0, pageService_1.updatePageService)(id, req.body);
    res.status(200).json({
        success: true,
        message: 'Page update successfully',
        data: result,
    });
}));
exports.deletePageController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield (0, pageService_1.deletePageService)(id);
    res.status(200).json({
        success: true,
        message: 'Page delete successfully',
    });
}));
