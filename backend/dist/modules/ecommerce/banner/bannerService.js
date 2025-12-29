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
exports.deleteBannerService = exports.updateBannerService = exports.getSingleBannerService = exports.getAllBannerService = exports.addBannerService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../../errors/AppError"));
const deleteFile_1 = require("../../../utils/deleteFile");
const bannerModel_1 = require("./bannerModel");
const addBannerService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bannerModel_1.Banner.create(data);
    return result;
});
exports.addBannerService = addBannerService;
const getAllBannerService = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bannerModel_1.Banner.find({});
    return result;
});
exports.getAllBannerService = getAllBannerService;
const getSingleBannerService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bannerModel_1.Banner.findById(id);
    return result;
});
exports.getSingleBannerService = getSingleBannerService;
const updateBannerService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield bannerModel_1.Banner.findById(id);
    if (!isExist) {
        if (data === null || data === void 0 ? void 0 : data.image)
            (0, deleteFile_1.deleteFile)(`./uploads${data.image}`);
        if (data === null || data === void 0 ? void 0 : data.mobileImage)
            (0, deleteFile_1.deleteFile)(`./uploads${data.mobileImage}`);
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Banner not found !');
    }
    const result = yield bannerModel_1.Banner.findByIdAndUpdate(id, data, { new: true });
    // Delete old images if new ones are provided
    if (result) {
        if ((data === null || data === void 0 ? void 0 : data.image) && (isExist === null || isExist === void 0 ? void 0 : isExist.image)) {
            (0, deleteFile_1.deleteFile)(`./uploads${isExist.image}`);
        }
        if ((data === null || data === void 0 ? void 0 : data.mobileImage) && (isExist === null || isExist === void 0 ? void 0 : isExist.mobileImage)) {
            (0, deleteFile_1.deleteFile)(`./uploads${isExist.mobileImage}`);
        }
    }
    return result;
});
exports.updateBannerService = updateBannerService;
const deleteBannerService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield bannerModel_1.Banner.findById(id);
    if (!isExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Banner not found !');
    }
    yield bannerModel_1.Banner.findByIdAndDelete(id);
    // Delete both desktop and mobile images
    if (isExist === null || isExist === void 0 ? void 0 : isExist.image) {
        (0, deleteFile_1.deleteFile)(`./uploads${isExist.image}`);
    }
    if (isExist === null || isExist === void 0 ? void 0 : isExist.mobileImage) {
        (0, deleteFile_1.deleteFile)(`./uploads${isExist.mobileImage}`);
    }
    return true;
});
exports.deleteBannerService = deleteBannerService;
