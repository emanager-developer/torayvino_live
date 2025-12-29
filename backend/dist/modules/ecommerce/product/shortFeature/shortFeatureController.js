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
exports.deleteShortFeatureController = exports.updateShortFeatureController = exports.getSingleShortFeatureController = exports.getAllShortFeatureController = exports.addShortFeatureController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = require("../../../../utils/catchAsync");
const AppError_1 = __importDefault(require("../../../../errors/AppError"));
const deleteFile_1 = require("../../../../utils/deleteFile");
const makeSlug_1 = require("../../../../utils/makeSlug");
const shortFeatureService_1 = require("./shortFeatureService");
exports.addShortFeatureController = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const image = (_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.filename;
    if (!image)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Image is required !');
    const data = Object.assign(Object.assign({ image: `feature/${image}` }, req.body), { slug: (0, makeSlug_1.makeSlug)(req.body.name) });
    try {
        const result = yield (0, shortFeatureService_1.addShortFeatureService)(data);
        res.status(200).json({
            success: true,
            message: 'Feature add successfully',
            data: result,
        });
    }
    catch (error) {
        if (image)
            (0, deleteFile_1.deleteFile)(`./uploads/feature/${image}`);
        next(error);
    }
}));
exports.getAllShortFeatureController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, shortFeatureService_1.getAllShortFeatureService)();
    res.status(200).json({
        success: true,
        message: 'Features get successfully',
        data: result,
    });
}));
exports.getSingleShortFeatureController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield (0, shortFeatureService_1.getSingleShortFeatureService)(id);
    res.status(200).json({
        success: true,
        message: 'Feature get successfully',
        data: result,
    });
}));
exports.updateShortFeatureController = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const image = (_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.filename;
    const id = req.params.id;
    // Build data object with only defined values
    const data = Object.assign({}, req.body);
    // Add image if provided
    if (image) {
        data.image = `feature/${image}`;
    }
    // Add slug if name is provided
    if (req.body.name) {
        data.slug = (0, makeSlug_1.makeSlug)(req.body.name);
    }
    try {
        const result = yield (0, shortFeatureService_1.updateShortFeatureService)(id, data);
        res.status(200).json({
            success: true,
            message: 'Feature updated successfully',
            data: result,
        });
    }
    catch (error) {
        if (image)
            (0, deleteFile_1.deleteFile)(`./uploads/feature/${image}`);
        next(error);
    }
}));
exports.deleteShortFeatureController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield (0, shortFeatureService_1.deleteShortFeatureService)(id);
    res.status(200).json({
        success: true,
        message: 'Feature delete successfully',
    });
}));
