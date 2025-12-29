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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteKitService = exports.updateKitService = exports.getBySlugKitService = exports.getByIdKitService = exports.getAllKitService = exports.createKitService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const kitModel_1 = require("./kitModel");
const QueryBuilder_1 = __importDefault(require("../../../builders/QueryBuilder"));
const AppError_1 = __importDefault(require("../../../errors/AppError"));
const deleteFile_1 = require("../../../utils/deleteFile");
const createKitService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield kitModel_1.Kit.create(data);
    return result;
});
exports.createKitService = createKitService;
const getAllKitService = (query) => __awaiter(void 0, void 0, void 0, function* () {
    // Handle product filtering separately since it's an array field
    const { product } = query, otherQuery = __rest(query, ["product"]);
    let baseQuery = kitModel_1.Kit.find();
    // If product filter is specified, filter by products array
    if (product && product !== '' && product !== 'null' && product !== null && product !== undefined) {
        baseQuery = baseQuery.find({ products: { $in: [product] } });
    }
    const KitQuery = new QueryBuilder_1.default(baseQuery.populate('products', 'title thumbnail price discount stock'), otherQuery)
        .search(['name'])
        .filter()
        .sort()
        .paginate()
        .fields();
    const meta = yield KitQuery.countTotal();
    const data = yield KitQuery.modelQuery;
    return {
        meta,
        data,
    };
});
exports.getAllKitService = getAllKitService;
const getByIdKitService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield kitModel_1.Kit.findById(id).populate('products', 'title thumbnail price discount stock');
    return result;
});
exports.getByIdKitService = getByIdKitService;
const getBySlugKitService = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield kitModel_1.Kit.findOne({ slug }).populate('products', 'title thumbnail price discount stock');
    return result;
});
exports.getBySlugKitService = getBySlugKitService;
const updateKitService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield kitModel_1.Kit.findById(id);
    if (!isExist)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Kit not found');
    const result = yield kitModel_1.Kit.findByIdAndUpdate(id, data, { new: true }).populate('products', 'title thumbnail price discount stock');
    return result;
});
exports.updateKitService = updateKitService;
const deleteKitService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield kitModel_1.Kit.findById(id);
    if (!isExist)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Kit not found');
    const result = yield kitModel_1.Kit.findByIdAndDelete(id);
    if (result && (isExist === null || isExist === void 0 ? void 0 : isExist.image)) {
        (0, deleteFile_1.deleteFile)(`./uploads/${isExist === null || isExist === void 0 ? void 0 : isExist.image}`);
    }
    return result;
});
exports.deleteKitService = deleteKitService;
