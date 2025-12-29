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
exports.deleteSubSubCategoryController = exports.updateSubSubCategoryController = exports.getSingleSubSubCategoryController = exports.getAllSubSubCategoryController = exports.addSubSubCategoryController = void 0;
const catchAsync_1 = require("../../../../utils/catchAsync");
const subSubCategoryService_1 = require("./subSubCategoryService");
exports.addSubSubCategoryController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, subSubCategoryService_1.addSubSubCategoryService)(req.body);
    res.status(200).json({
        success: true,
        message: 'SubSubCategory add successfully',
        data: result,
    });
}));
exports.getAllSubSubCategoryController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, subSubCategoryService_1.getAllSubSubCategoryService)();
    res.status(200).json({
        success: true,
        message: 'SubCategories get successfully',
        data: result,
    });
}));
exports.getSingleSubSubCategoryController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield (0, subSubCategoryService_1.getSingleSubSubCategoryService)(id);
    res.status(200).json({
        success: true,
        message: 'SubSubCategory get successfully',
        data: result,
    });
}));
exports.updateSubSubCategoryController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield (0, subSubCategoryService_1.updateSubSubCategoryService)(id, req.body);
    res.status(200).json({
        success: true,
        message: 'SubSubCategory update successfully',
        data: result,
    });
}));
exports.deleteSubSubCategoryController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield (0, subSubCategoryService_1.deleteSubSubCategoryService)(id);
    res.status(200).json({
        success: true,
        message: 'SubSubCategory delete successfully',
    });
}));
