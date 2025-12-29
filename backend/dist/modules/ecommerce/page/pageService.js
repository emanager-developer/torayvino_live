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
exports.deletePageService = exports.updatePageService = exports.getSinglePageService = exports.getAllPageService = exports.addPageService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../../errors/AppError"));
const pageModel_1 = require("./pageModel");
const makeSlug_1 = require("../../../utils/makeSlug");
const mongoose_1 = __importDefault(require("mongoose"));
const addPageService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield pageModel_1.Page.create(Object.assign(Object.assign({}, data), { slug: (0, makeSlug_1.makeSlug)(data === null || data === void 0 ? void 0 : data.title) }));
    return result;
});
exports.addPageService = addPageService;
const getAllPageService = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield pageModel_1.Page.find({});
    return result;
});
exports.getAllPageService = getAllPageService;
const getSinglePageService = (query) => __awaiter(void 0, void 0, void 0, function* () {
    let filter = { slug: query };
    if (mongoose_1.default.Types.ObjectId.isValid(query)) {
        filter = { $or: [{ _id: query }, { slug: query }] };
    }
    const result = yield pageModel_1.Page.findOne(filter);
    return result;
});
exports.getSinglePageService = getSinglePageService;
const updatePageService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield pageModel_1.Page.findById(id);
    if (!isExist)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Page not found !');
    const result = yield pageModel_1.Page.findByIdAndUpdate(id, Object.assign(Object.assign({}, data), { slug: (0, makeSlug_1.makeSlug)(data === null || data === void 0 ? void 0 : data.title) }), { new: true });
    return result;
});
exports.updatePageService = updatePageService;
const deletePageService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield pageModel_1.Page.findById(id);
    if (!isExist)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Page not found !');
    yield pageModel_1.Page.findByIdAndDelete(id);
    return true;
});
exports.deletePageService = deletePageService;
