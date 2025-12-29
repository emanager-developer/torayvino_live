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
exports.deleteVideoGalleryService = exports.updateVideoGalleryService = exports.getSingleVideoGalleryService = exports.getAllVideoGalleryService = exports.addVideoGalleryService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../../errors/AppError"));
const videoGalleryModel_1 = require("./videoGalleryModel");
const addVideoGalleryService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield videoGalleryModel_1.VideoGallery.create(data);
    return result;
});
exports.addVideoGalleryService = addVideoGalleryService;
const getAllVideoGalleryService = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield videoGalleryModel_1.VideoGallery.find({});
    return result;
});
exports.getAllVideoGalleryService = getAllVideoGalleryService;
const getSingleVideoGalleryService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield videoGalleryModel_1.VideoGallery.findById(id);
    return result;
});
exports.getSingleVideoGalleryService = getSingleVideoGalleryService;
const updateVideoGalleryService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield videoGalleryModel_1.VideoGallery.findById(id);
    if (!isExist)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'VideoGallery not found !');
    const result = yield videoGalleryModel_1.VideoGallery.findByIdAndUpdate(id, data, { new: true });
    return result;
});
exports.updateVideoGalleryService = updateVideoGalleryService;
const deleteVideoGalleryService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield videoGalleryModel_1.VideoGallery.findById(id);
    if (!isExist)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'VideoGallery not found !');
    yield videoGalleryModel_1.VideoGallery.findByIdAndDelete(id);
    return true;
});
exports.deleteVideoGalleryService = deleteVideoGalleryService;
