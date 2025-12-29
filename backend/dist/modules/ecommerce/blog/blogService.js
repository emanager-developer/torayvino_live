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
exports.deleteBlogService = exports.updateBlogService = exports.getSingleBlogService = exports.getAllBlogService = exports.addBlogService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../../errors/AppError"));
const deleteFile_1 = require("../../../utils/deleteFile");
const blogModel_1 = require("./blogModel");
const addBlogService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blogModel_1.Blog.create(data);
    return result;
});
exports.addBlogService = addBlogService;
const getAllBlogService = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blogModel_1.Blog.find({});
    return result;
});
exports.getAllBlogService = getAllBlogService;
const getSingleBlogService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blogModel_1.Blog.findById(id);
    return result;
});
exports.getSingleBlogService = getSingleBlogService;
const updateBlogService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield blogModel_1.Blog.findById(id);
    if (!isExist) {
        if (data === null || data === void 0 ? void 0 : data.image)
            (0, deleteFile_1.deleteFile)(`./uploads${data.image}`);
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Blog not found !');
    }
    const result = yield blogModel_1.Blog.findByIdAndUpdate(id, data, { new: true });
    // If a new image was provided, delete the old one
    if (result) {
        if ((data === null || data === void 0 ? void 0 : data.image) && (isExist === null || isExist === void 0 ? void 0 : isExist.image)) {
            (0, deleteFile_1.deleteFile)(`./uploads${isExist.image}`);
        }
    }
    return result;
});
exports.updateBlogService = updateBlogService;
const deleteBlogService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield blogModel_1.Blog.findById(id);
    if (!isExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Blog not found !');
    }
    yield blogModel_1.Blog.findByIdAndDelete(id);
    (0, deleteFile_1.deleteFile)(`./uploads/${isExist === null || isExist === void 0 ? void 0 : isExist.image}`);
    return true;
});
exports.deleteBlogService = deleteBlogService;
