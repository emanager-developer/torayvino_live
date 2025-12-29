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
exports.deleteOfferBannerService = exports.updateOfferBannerService = exports.getSingleOfferBannerService = exports.getAllOfferBannerService = exports.addOfferBannerService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../../../errors/AppError"));
const deleteFile_1 = require("../../../../utils/deleteFile");
const offerBannerModel_1 = require("./offerBannerModel");
const addOfferBannerService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield offerBannerModel_1.OfferBanner.create(data);
    return result;
});
exports.addOfferBannerService = addOfferBannerService;
const getAllOfferBannerService = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield offerBannerModel_1.OfferBanner.find({});
    return result;
});
exports.getAllOfferBannerService = getAllOfferBannerService;
const getSingleOfferBannerService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield offerBannerModel_1.OfferBanner.findById(id);
    return result;
});
exports.getSingleOfferBannerService = getSingleOfferBannerService;
const updateOfferBannerService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield offerBannerModel_1.OfferBanner.findById(id);
    if (!isExist) {
        if (data === null || data === void 0 ? void 0 : data.image)
            (0, deleteFile_1.deleteFile)(`./uploads${data.image}`);
        if (data === null || data === void 0 ? void 0 : data.mobileImage)
            (0, deleteFile_1.deleteFile)(`./uploads${data.mobileImage}`);
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Banner not found !');
    }
    const result = yield offerBannerModel_1.OfferBanner.findByIdAndUpdate(id, data, { new: true });
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
exports.updateOfferBannerService = updateOfferBannerService;
const deleteOfferBannerService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield offerBannerModel_1.OfferBanner.findById(id);
    if (!isExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Banner not found !');
    }
    yield offerBannerModel_1.OfferBanner.findByIdAndDelete(id);
    // Delete both desktop and mobile images
    if (isExist === null || isExist === void 0 ? void 0 : isExist.image) {
        (0, deleteFile_1.deleteFile)(`./uploads${isExist.image}`);
    }
    if (isExist === null || isExist === void 0 ? void 0 : isExist.mobileImage) {
        (0, deleteFile_1.deleteFile)(`./uploads${isExist.mobileImage}`);
    }
    return true;
});
exports.deleteOfferBannerService = deleteOfferBannerService;
