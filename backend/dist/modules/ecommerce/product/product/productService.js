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
exports.updateProductFeatureService = exports.trueProductIsShowService = exports.deleteProductService = exports.updateProductService = exports.getBySlugProductService = exports.getByIdProductService = exports.getAllProductService = exports.createProductService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const productModel_1 = require("./productModel");
const QueryBuilder_1 = __importDefault(require("../../../../builders/QueryBuilder"));
const AppError_1 = __importDefault(require("../../../../errors/AppError"));
const deleteFile_1 = require("../../../../utils/deleteFile");
const createProductService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield productModel_1.Product.create(data);
    return result;
});
exports.createProductService = createProductService;
const getAllProductService = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const ProductQuery = new QueryBuilder_1.default(productModel_1.Product.find()
        .populate('category subCategory subSubCategory', 'name image')
        .populate('feature', 'name description image')
        .populate('shortFeature', 'name image'), query)
        .search(['title'])
        .filter()
        .sort()
        .paginate()
        .fields();
    const meta = yield ProductQuery.countTotal();
    const data = yield ProductQuery.modelQuery;
    return {
        meta,
        data,
    };
});
exports.getAllProductService = getAllProductService;
const getByIdProductService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield productModel_1.Product.findById(id)
        .populate('category subCategory subSubCategory', 'name image')
        .populate('feature', 'name description image')
        .populate('shortFeature', 'name image')
        .populate('kits', 'name image price discount stock specifications');
    return result;
});
exports.getByIdProductService = getByIdProductService;
const getBySlugProductService = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield productModel_1.Product.findOne({ slug })
        .populate('category subCategory subSubCategory', 'name image')
        .populate('feature', 'name description image')
        .populate('shortFeature', 'name image')
        .populate('kits', 'name image price discount stock specifications');
    return result;
});
exports.getBySlugProductService = getBySlugProductService;
const updateProductService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield productModel_1.Product.findById(id);
    if (!isExist)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Product not found');
    const result = yield productModel_1.Product.findByIdAndUpdate(id, data, { new: true });
    return result;
});
exports.updateProductService = updateProductService;
const deleteProductService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const isExist = yield productModel_1.Product.findById(id);
    if (!isExist)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Product not found');
    const result = yield productModel_1.Product.findByIdAndDelete(id);
    if (result) {
        (0, deleteFile_1.deleteFile)(`./uploads/${isExist === null || isExist === void 0 ? void 0 : isExist.thumbnail}`);
        if (((_b = (_a = isExist === null || isExist === void 0 ? void 0 : isExist.galleries) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0) > 0) {
            (_c = isExist === null || isExist === void 0 ? void 0 : isExist.galleries) === null || _c === void 0 ? void 0 : _c.forEach((gallery) => {
                (0, deleteFile_1.deleteFile)(`./uploads/${gallery}`);
            });
        }
    }
    return result;
});
exports.deleteProductService = deleteProductService;
const trueProductIsShowService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield productModel_1.Product.findById(id);
    if (!isExist)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Product not found');
    const result = yield productModel_1.Product.findByIdAndUpdate(id, { isShow: true }, { new: true });
    return result;
});
exports.trueProductIsShowService = trueProductIsShowService;
const updateProductFeatureService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield productModel_1.Product.findById(id);
    if (!isExist)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Product not found');
    const result = yield productModel_1.Product.findByIdAndUpdate(id, {
        featured: !isExist.featured,
    });
    return result;
});
exports.updateProductFeatureService = updateProductFeatureService;
