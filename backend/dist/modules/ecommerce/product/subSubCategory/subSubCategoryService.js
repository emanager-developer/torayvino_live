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
exports.deleteSubSubCategoryService = exports.updateSubSubCategoryService = exports.getSingleSubSubCategoryService = exports.getAllSubSubCategoryService = exports.addSubSubCategoryService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../../../errors/AppError"));
const subSubCategoryModel_1 = require("./subSubCategoryModel");
const makeSlug_1 = require("../../../../utils/makeSlug");
const mongoose_1 = __importDefault(require("mongoose"));
const subCategoryModel_1 = require("../subCategory/subCategoryModel");
const categoryModel_1 = require("../category/categoryModel");
const addSubSubCategoryService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const name = data === null || data === void 0 ? void 0 : data.name;
    const categoryId = (data === null || data === void 0 ? void 0 : data.categoryId) || (data === null || data === void 0 ? void 0 : data.category);
    const subCategoryId = (data === null || data === void 0 ? void 0 : data.subCategoryId) || (data === null || data === void 0 ? void 0 : data.subCategory);
    if (!name)
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Name is required');
    if (!categoryId)
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'categoryId is required');
    if (!subCategoryId)
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'subCategoryId is required');
    if (!mongoose_1.default.Types.ObjectId.isValid(categoryId))
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Invalid categoryId');
    if (!mongoose_1.default.Types.ObjectId.isValid(subCategoryId))
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Invalid subCategoryId');
    const newSubSubCategory = yield subSubCategoryModel_1.SubSubCategory.create({
        name,
        slug: (0, makeSlug_1.makeSlug)(name) + '-' + Date.now(),
        category: new mongoose_1.default.Types.ObjectId(categoryId),
        subCategory: new mongoose_1.default.Types.ObjectId(subCategoryId),
    });
    // verify parent category and parent subCategory exist
    const category = yield categoryModel_1.Category.findById(categoryId);
    const subCategory = yield subCategoryModel_1.SubCategory.findById(subCategoryId);
    if (!category || !subCategory) {
        yield subSubCategoryModel_1.SubSubCategory.findByIdAndDelete(newSubSubCategory._id);
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Parent Category or SubCategory not found.');
    }
    // ensure subCategory.subSubCategories array exists and push
    subCategory.subSubCategories = subCategory.subSubCategories || [];
    subCategory.subSubCategories.push(newSubSubCategory._id);
    yield subCategory.save();
    return newSubSubCategory;
});
exports.addSubSubCategoryService = addSubSubCategoryService;
const getAllSubSubCategoryService = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield subSubCategoryModel_1.SubSubCategory.find({}).populate('category subCategory');
    return result;
});
exports.getAllSubSubCategoryService = getAllSubSubCategoryService;
const getSingleSubSubCategoryService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield subSubCategoryModel_1.SubSubCategory.findById(id).populate('category subCategory');
    return result;
});
exports.getSingleSubSubCategoryService = getSingleSubSubCategoryService;
const updateSubSubCategoryService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield subSubCategoryModel_1.SubSubCategory.findById(id);
    if (!isExist)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'SubSubCategory not found !');
    const result = yield subSubCategoryModel_1.SubSubCategory.findByIdAndUpdate(id, Object.assign(Object.assign({}, data), { slug: (0, makeSlug_1.makeSlug)(data.name) }), {
        new: true,
    });
    return result;
});
exports.updateSubSubCategoryService = updateSubSubCategoryService;
const deleteSubSubCategoryService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield subSubCategoryModel_1.SubSubCategory.findById(id);
    if (!isExist)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'SubSubCategory not found !');
    yield subSubCategoryModel_1.SubSubCategory.findByIdAndDelete(id);
    return true;
});
exports.deleteSubSubCategoryService = deleteSubSubCategoryService;
