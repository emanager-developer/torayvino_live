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
exports.deleteSubCategoryController = exports.updateSubCategoryController = exports.getSingleSubCategoryController = exports.getAllSubCategoryController = exports.addSubCategoryController = void 0;
const catchAsync_1 = require("../../../../utils/catchAsync");
const subCategoryService_1 = require("./subCategoryService");
exports.addSubCategoryController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, subCategoryService_1.addSubCategoryService)(req.body);
    res.status(201).json({
        success: true,
        message: 'SubCategory created and added to Category successfully',
        data: result,
    });
}));
exports.getAllSubCategoryController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { meta, data } = yield (0, subCategoryService_1.getAllSubCategoryService)(req.query);
    res.status(200).json({
        success: true,
        message: 'SubCategories get successfully',
        meta,
        data,
    });
}));
exports.getSingleSubCategoryController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield (0, subCategoryService_1.getSingleSubCategoryService)(id);
    res.status(200).json({
        success: true,
        message: 'SubCategory get successfully',
        data: result,
    });
}));
exports.updateSubCategoryController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield (0, subCategoryService_1.updateSubCategoryService)(id, req.body);
    res.status(200).json({
        success: true,
        message: 'SubCategory update successfully',
        data: result,
    });
}));
exports.deleteSubCategoryController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield (0, subCategoryService_1.deleteSubCategoryService)(id);
    res.status(200).json({
        success: true,
        message: 'SubCategory delete successfully',
    });
}));
