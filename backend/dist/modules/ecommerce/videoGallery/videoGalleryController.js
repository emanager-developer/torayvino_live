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
exports.deleteVideoGalleryController = exports.updateVideoGalleryController = exports.getSingleVideoGalleryController = exports.getAllVideoGalleryController = exports.addVideoGalleryController = void 0;
const catchAsync_1 = require("../../../utils/catchAsync");
const videoGalleryService_1 = require("./videoGalleryService");
exports.addVideoGalleryController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, videoGalleryService_1.addVideoGalleryService)(req.body);
    res.status(200).json({
        success: true,
        message: 'VideoGallery add successfully',
        data: result,
    });
}));
exports.getAllVideoGalleryController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, videoGalleryService_1.getAllVideoGalleryService)();
    res.status(200).json({
        success: true,
        message: 'VideoGalleries get successfully',
        data: result,
    });
}));
exports.getSingleVideoGalleryController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield (0, videoGalleryService_1.getSingleVideoGalleryService)(id);
    res.status(200).json({
        success: true,
        message: 'VideoGallery get successfully',
        data: result,
    });
}));
exports.updateVideoGalleryController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield (0, videoGalleryService_1.updateVideoGalleryService)(id, req.body);
    res.status(200).json({
        success: true,
        message: 'VideoGallery update successfully',
        data: result,
    });
}));
exports.deleteVideoGalleryController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield (0, videoGalleryService_1.deleteVideoGalleryService)(id);
    res.status(200).json({
        success: true,
        message: 'VideoGallery delete successfully',
    });
}));
