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
exports.deleteBrandService = exports.updateBrandService = exports.getSingleBrandService = exports.getAllBrandService = exports.addBrandService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../../../errors/AppError"));
const deleteFile_1 = require("../../../../utils/deleteFile");
const brandModel_1 = require("./brandModel");
const addBrandService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield brandModel_1.Brand.create(data);
    return result;
});
exports.addBrandService = addBrandService;
const getAllBrandService = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield brandModel_1.Brand.find({});
    return result;
});
exports.getAllBrandService = getAllBrandService;
const getSingleBrandService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield brandModel_1.Brand.findById(id);
    return result;
});
exports.getSingleBrandService = getSingleBrandService;
const updateBrandService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield brandModel_1.Brand.findById(id);
    if (!isExist) {
        (0, deleteFile_1.deleteFile)(`./uploads/${data === null || data === void 0 ? void 0 : data.image}`);
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Brand not found !');
    }
    const result = yield brandModel_1.Brand.findByIdAndUpdate(id, data, { new: true });
    if (result && (data === null || data === void 0 ? void 0 : data.image))
        (0, deleteFile_1.deleteFile)(`./uploads/${isExist === null || isExist === void 0 ? void 0 : isExist.image}`);
    return result;
});
exports.updateBrandService = updateBrandService;
const deleteBrandService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield brandModel_1.Brand.findById(id);
    if (!isExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Brand not found !');
    }
    yield brandModel_1.Brand.findByIdAndDelete(id);
    (0, deleteFile_1.deleteFile)(`./uploads/${isExist === null || isExist === void 0 ? void 0 : isExist.image}`);
    return true;
});
exports.deleteBrandService = deleteBrandService;
