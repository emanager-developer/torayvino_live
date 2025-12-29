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
exports.deleteCategoryController = exports.updateCategoryController = exports.getSingleCategoryController = exports.getAllCategoryController = exports.addCategoryController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = require("../../../../utils/catchAsync");
const AppError_1 = __importDefault(require("../../../../errors/AppError"));
const deleteFile_1 = require("../../../../utils/deleteFile");
const categoryService_1 = require("./categoryService");
const makeSlug_1 = require("../../../../utils/makeSlug");
exports.addCategoryController = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const image = (_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.filename;
    if (!image)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Image is required !');
    const data = Object.assign(Object.assign({ image: `/category/${image}` }, req.body), { slug: (0, makeSlug_1.makeSlug)(req.body.name) });
    try {
        const result = yield (0, categoryService_1.addCategoryService)(data);
        res.status(200).json({
            success: true,
            message: 'Category add successfully',
            data: result,
        });
    }
    catch (error) {
        if (image)
            (0, deleteFile_1.deleteFile)(`./uploads/category/${image}`);
        next(error);
    }
}));
exports.getAllCategoryController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, categoryService_1.getAllCategoryService)();
    res.status(200).json({
        success: true,
        message: 'Categories get successfully',
        data: result,
    });
}));
exports.getSingleCategoryController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield (0, categoryService_1.getSingleCategoryService)(id);
    res.status(200).json({
        success: true,
        message: 'Category get successfully',
        data: result,
    });
}));
exports.updateCategoryController = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const image = (_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.filename;
    const id = req.params.id;
    const data = Object.assign(Object.assign({ image: image ? `/category/${image}` : undefined }, req.body), { slug: (0, makeSlug_1.makeSlug)(req.body.name) });
    try {
        const result = yield (0, categoryService_1.updateCategoryService)(id, data);
        res.status(200).json({
            success: true,
            message: 'Category update successfully',
            data: result,
        });
    }
    catch (error) {
        if (image)
            (0, deleteFile_1.deleteFile)(`./uploads/category/${image}`);
        next(error);
    }
}));
exports.deleteCategoryController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield (0, categoryService_1.deleteCategoryService)(id);
    res.status(200).json({
        success: true,
        message: 'Category delete successfully',
    });
}));
