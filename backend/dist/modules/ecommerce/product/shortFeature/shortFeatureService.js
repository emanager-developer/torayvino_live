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
exports.deleteShortFeatureService = exports.updateShortFeatureService = exports.getSingleShortFeatureService = exports.getAllShortFeatureService = exports.addShortFeatureService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../../../errors/AppError"));
const deleteFile_1 = require("../../../../utils/deleteFile");
const shortFeatureModel_1 = require("./shortFeatureModel");
const addShortFeatureService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield shortFeatureModel_1.ShortFeature.create(data);
    return result;
});
exports.addShortFeatureService = addShortFeatureService;
const getAllShortFeatureService = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield shortFeatureModel_1.ShortFeature.find({});
    return result;
});
exports.getAllShortFeatureService = getAllShortFeatureService;
const getSingleShortFeatureService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield shortFeatureModel_1.ShortFeature.findById(id);
    return result;
});
exports.getSingleShortFeatureService = getSingleShortFeatureService;
const updateShortFeatureService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield shortFeatureModel_1.ShortFeature.findById(id);
    if (!isExist) {
        // Delete the new uploaded file if feature doesn't exist
        if (data === null || data === void 0 ? void 0 : data.image) {
            const imagePath = data.image.startsWith('/') ? data.image.substring(1) : data.image;
            (0, deleteFile_1.deleteFile)(`./uploads/${imagePath}`);
        }
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Feature not found !');
    }
    const result = yield shortFeatureModel_1.ShortFeature.findByIdAndUpdate(id, data, { new: true });
    // Delete old image only if update was successful and new image was provided
    if (result && (data === null || data === void 0 ? void 0 : data.image) && (isExist === null || isExist === void 0 ? void 0 : isExist.image)) {
        const oldImagePath = isExist.image.startsWith('/') ? isExist.image.substring(1) : isExist.image;
        (0, deleteFile_1.deleteFile)(`./uploads/${oldImagePath}`);
    }
    return result;
});
exports.updateShortFeatureService = updateShortFeatureService;
const deleteShortFeatureService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield shortFeatureModel_1.ShortFeature.findById(id);
    if (!isExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Feature not found !');
    }
    const result = yield shortFeatureModel_1.ShortFeature.findByIdAndDelete(id);
    if (result && (isExist === null || isExist === void 0 ? void 0 : isExist.image)) {
        const imagePath = isExist.image.startsWith('/') ? isExist.image.substring(1) : isExist.image;
        (0, deleteFile_1.deleteFile)(`./uploads/${imagePath}`);
    }
    return true;
});
exports.deleteShortFeatureService = deleteShortFeatureService;
