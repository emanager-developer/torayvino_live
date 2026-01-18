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
exports.deleteSubCategoryService = exports.updateSubCategoryService = exports.getSingleSubCategoryService = exports.getAllSubCategoryService = exports.addSubCategoryService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../../../errors/AppError"));
const subCategoryModel_1 = require("./subCategoryModel");
const categoryModel_1 = require("../category/categoryModel");
const mongoose_1 = __importDefault(require("mongoose"));
const makeSlug_1 = require("../../../../utils/makeSlug");
const QueryBuilder_1 = __importDefault(require("../../../../builders/QueryBuilder"));
const addSubCategoryService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const name = data === null || data === void 0 ? void 0 : data.name;
    const categoryId = (data === null || data === void 0 ? void 0 : data.categoryId) || (data === null || data === void 0 ? void 0 : data.category);
    if (!name)
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Name is required');
    if (!categoryId)
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'categoryId is required');
    if (!mongoose_1.default.Types.ObjectId.isValid(categoryId))
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Invalid categoryId');
    const newSubCategory = yield subCategoryModel_1.SubCategory.create({
        name,
        slug: (0, makeSlug_1.makeSlug)(name),
        category: new mongoose_1.default.Types.ObjectId(categoryId),
    });
    const category = yield categoryModel_1.Category.findById(categoryId);
    if (!category) {
        yield subCategoryModel_1.SubCategory.findByIdAndDelete(newSubCategory._id);
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Parent Category not found.');
    }
    category.subCategories = category.subCategories || [];
    category.subCategories.push(newSubCategory._id);
    yield category.save();
    return newSubCategory;
});
exports.addSubCategoryService = addSubCategoryService;
const getAllSubCategoryService = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const Query = new QueryBuilder_1.default(subCategoryModel_1.SubCategory.find().populate('category'), query)
        .search(['name'])
        .filter()
        .sort()
        .paginate()
        .fields();
    const meta = yield Query.countTotal();
    const data = yield Query.modelQuery;
    return {
        meta,
        data,
    };
});
exports.getAllSubCategoryService = getAllSubCategoryService;
const getSingleSubCategoryService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield subCategoryModel_1.SubCategory.findById(id).populate('category');
    return result;
});
exports.getSingleSubCategoryService = getSingleSubCategoryService;
const updateSubCategoryService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield subCategoryModel_1.SubCategory.findById(id);
    if (!isExist)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'SubCategory not found !');
    const result = yield subCategoryModel_1.SubCategory.findByIdAndUpdate(id, Object.assign(Object.assign({}, data), { slug: (0, makeSlug_1.makeSlug)(data.name) }), { new: true });
    return result;
});
exports.updateSubCategoryService = updateSubCategoryService;
const deleteSubCategoryService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield subCategoryModel_1.SubCategory.findById(id);
    if (!isExist)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'SubCategory not found !');
    yield subCategoryModel_1.SubCategory.findByIdAndDelete(id);
    return true;
});
exports.deleteSubCategoryService = deleteSubCategoryService;
