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
exports.deleteTagsService = exports.updateTagsService = exports.getSingleTagsService = exports.getAllTagsService = exports.addTagsService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const tagsModel_1 = require("./tagsModel");
const AppError_1 = __importDefault(require("../../../../errors/AppError"));
const addTagsService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield tagsModel_1.Tags.create(data);
    return result;
});
exports.addTagsService = addTagsService;
const getAllTagsService = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield tagsModel_1.Tags.find({});
    return result;
});
exports.getAllTagsService = getAllTagsService;
const getSingleTagsService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield tagsModel_1.Tags.findById(id);
    return result;
});
exports.getSingleTagsService = getSingleTagsService;
const updateTagsService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield tagsModel_1.Tags.findById(id);
    if (!isExist)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Tags not found !');
    const result = yield tagsModel_1.Tags.findByIdAndUpdate(id, data, { new: true });
    return result;
});
exports.updateTagsService = updateTagsService;
const deleteTagsService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield tagsModel_1.Tags.findById(id);
    if (!isExist)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Tags not found !');
    yield tagsModel_1.Tags.findByIdAndDelete(id);
    return true;
});
exports.deleteTagsService = deleteTagsService;
