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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateWhyChooseController = exports.getWhyChooseController = exports.addWhyChooseController = void 0;
const catchAsync_1 = require("../../../utils/catchAsync");
const deleteFile_1 = require("../../../utils/deleteFile");
const whyChooseService_1 = require("./whyChooseService");
exports.addWhyChooseController = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const images = req.files;
    const _a = req.body, { points } = _a, restData = __rest(_a, ["points"]);
    // Process points with images
    let imageIndex = 0;
    const processedPoints = (points === null || points === void 0 ? void 0 : points.map((point) => {
        // Use the hasNewImage flag from frontend
        const image = point.hasNewImage && images && imageIndex < images.length ? images[imageIndex++] : null;
        return {
            title: point.title,
            description: point.description,
            image: image ? `/whyChoose/${image.filename}` : point.image,
        };
    })) || [];
    const data = Object.assign(Object.assign({}, restData), { points: processedPoints });
    try {
        const result = yield (0, whyChooseService_1.addWhyChooseService)(data);
        res.status(200).json({
            success: true,
            message: 'WhyChoose create successfully',
            data: result,
        });
    }
    catch (error) {
        // Clean up uploaded images if operation fails
        if (images === null || images === void 0 ? void 0 : images.length) {
            images.forEach((file) => {
                (0, deleteFile_1.deleteFile)(`./uploads/whyChoose/${file.filename}`);
            });
        }
        next(error);
    }
}));
exports.getWhyChooseController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, whyChooseService_1.getWhyChooseService)();
    res.status(200).json({
        success: true,
        message: 'WhyChoose get successfully',
        data: result,
    });
}));
exports.updateWhyChooseController = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const images = req.files;
    const _a = req.body, { points } = _a, restData = __rest(_a, ["points"]);
    // Process points with images
    let imageIndex = 0;
    const processedPoints = (points === null || points === void 0 ? void 0 : points.map((point) => {
        // Use the hasNewImage flag from frontend
        const image = point.hasNewImage && images && imageIndex < images.length ? images[imageIndex++] : null;
        return {
            title: point.title,
            description: point.description,
            image: image ? `/whyChoose/${image.filename}` : point.image, // Keep existing image if no new one
        };
    })) || [];
    const data = Object.assign(Object.assign({}, restData), { points: processedPoints });
    try {
        const result = yield (0, whyChooseService_1.updateWhyChooseService)(id, data);
        res.status(200).json({
            success: true,
            message: 'WhyChoose update successfully',
            data: result,
        });
    }
    catch (error) {
        // Clean up uploaded images if operation fails
        if (images === null || images === void 0 ? void 0 : images.length) {
            images.forEach((file) => {
                (0, deleteFile_1.deleteFile)(`./uploads/whyChoose/${file.filename}`);
            });
        }
        next(error);
    }
}));
