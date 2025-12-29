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
exports.deleteBannerController = exports.updateBannerController = exports.getSingleBannerController = exports.getAllBannerController = exports.addBannerController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = require("../../../utils/catchAsync");
const AppError_1 = __importDefault(require("../../../errors/AppError"));
const deleteFile_1 = require("../../../utils/deleteFile");
const bannerService_1 = require("./bannerService");
exports.addBannerController = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const files = req.files;
    const image = (_b = (_a = files === null || files === void 0 ? void 0 : files.image) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.filename;
    const mobileImage = (_d = (_c = files === null || files === void 0 ? void 0 : files.mobileImage) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.filename;
    if (!image)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Desktop image is required !');
    const data = Object.assign({ image: `/banner/${image}`, mobileImage: mobileImage ? `/banner/${mobileImage}` : undefined }, req.body);
    try {
        const result = yield (0, bannerService_1.addBannerService)(data);
        res.status(200).json({
            success: true,
            message: 'Banner add successfully',
            data: result,
        });
    }
    catch (error) {
        if (image)
            (0, deleteFile_1.deleteFile)(`./uploads/banner/${image}`);
        if (mobileImage)
            (0, deleteFile_1.deleteFile)(`./uploads/banner/${mobileImage}`);
        next(error);
    }
}));
exports.getAllBannerController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, bannerService_1.getAllBannerService)();
    res.status(200).json({
        success: true,
        message: 'Banners get successfully',
        data: result,
    });
}));
exports.getSingleBannerController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield (0, bannerService_1.getSingleBannerService)(id);
    res.status(200).json({
        success: true,
        message: 'Banner get successfully',
        data: result,
    });
}));
exports.updateBannerController = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const files = req.files;
    const image = (_b = (_a = files === null || files === void 0 ? void 0 : files.image) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.filename;
    const mobileImage = (_d = (_c = files === null || files === void 0 ? void 0 : files.mobileImage) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.filename;
    const id = req.params.id;
    const data = Object.assign({ image: image ? `/banner/${image}` : undefined, mobileImage: mobileImage ? `/banner/${mobileImage}` : undefined }, req.body);
    try {
        const result = yield (0, bannerService_1.updateBannerService)(id, data);
        res.status(200).json({
            success: true,
            message: 'Banner update successfully',
            data: result,
        });
    }
    catch (error) {
        if (image)
            (0, deleteFile_1.deleteFile)(`./uploads/banner/${image}`);
        if (mobileImage)
            (0, deleteFile_1.deleteFile)(`./uploads/banner/${mobileImage}`);
        next(error);
    }
}));
exports.deleteBannerController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield (0, bannerService_1.deleteBannerService)(id);
    res.status(200).json({
        success: true,
        message: 'Banner delete successfully',
    });
}));
