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
exports.deleteFeatureService = exports.updateFeatureService = exports.getSingleFeatureService = exports.getAllFeatureService = exports.addFeatureService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../../../errors/AppError"));
const deleteFile_1 = require("../../../../utils/deleteFile");
const featureModel_1 = require("./featureModel");
const addFeatureService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield featureModel_1.Feature.create(data);
    return result;
});
exports.addFeatureService = addFeatureService;
const getAllFeatureService = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield featureModel_1.Feature.find({});
    return result;
});
exports.getAllFeatureService = getAllFeatureService;
const getSingleFeatureService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield featureModel_1.Feature.findById(id);
    return result;
});
exports.getSingleFeatureService = getSingleFeatureService;
const updateFeatureService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield featureModel_1.Feature.findById(id);
    if (!isExist) {
        // Delete the new uploaded file if feature doesn't exist
        if (data === null || data === void 0 ? void 0 : data.image) {
            const imagePath = data.image.startsWith('/') ? data.image.substring(1) : data.image;
            (0, deleteFile_1.deleteFile)(`./uploads/${imagePath}`);
        }
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Feature not found !');
    }
    const result = yield featureModel_1.Feature.findByIdAndUpdate(id, data, { new: true });
    // Delete old image only if update was successful and new image was provided
    if (result && (data === null || data === void 0 ? void 0 : data.image) && (isExist === null || isExist === void 0 ? void 0 : isExist.image)) {
        const oldImagePath = isExist.image.startsWith('/') ? isExist.image.substring(1) : isExist.image;
        (0, deleteFile_1.deleteFile)(`./uploads/${oldImagePath}`);
    }
    return result;
});
exports.updateFeatureService = updateFeatureService;
const deleteFeatureService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield featureModel_1.Feature.findById(id);
    if (!isExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Feature not found !');
    }
    const result = yield featureModel_1.Feature.findByIdAndDelete(id);
    if (result && (isExist === null || isExist === void 0 ? void 0 : isExist.image)) {
        const imagePath = isExist.image.startsWith('/') ? isExist.image.substring(1) : isExist.image;
        (0, deleteFile_1.deleteFile)(`./uploads/${imagePath}`);
    }
    return true;
});
exports.deleteFeatureService = deleteFeatureService;
