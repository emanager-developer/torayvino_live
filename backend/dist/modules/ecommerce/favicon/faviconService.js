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
exports.updateFaviconService = exports.getFaviconService = exports.addFaviconService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../../errors/AppError"));
const deleteFile_1 = require("../../../utils/deleteFile");
const faviconModel_1 = require("./faviconModel");
const addFaviconService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield faviconModel_1.Favicon.findOne();
    if (isExist) {
        (0, deleteFile_1.deleteFile)(`./uploads/${data.favicon}`);
        throw new AppError_1.default(http_status_1.default.CONFLICT, 'Favicon already exist !');
    }
    const result = yield faviconModel_1.Favicon.create(data);
    return result;
});
exports.addFaviconService = addFaviconService;
const getFaviconService = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield faviconModel_1.Favicon.findOne();
    return result;
});
exports.getFaviconService = getFaviconService;
const updateFaviconService = (data, id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield faviconModel_1.Favicon.findById(id);
    if (!isExist) {
        (0, deleteFile_1.deleteFile)(`./uploads/${data.favicon}`);
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'favicon not found !');
    }
    const result = yield faviconModel_1.Favicon.findByIdAndUpdate(id, data, { new: true });
    if ((result === null || result === void 0 ? void 0 : result.favicon) && (data === null || data === void 0 ? void 0 : data.favicon) && (isExist === null || isExist === void 0 ? void 0 : isExist.favicon)) {
        (0, deleteFile_1.deleteFile)(`./uploads/${isExist === null || isExist === void 0 ? void 0 : isExist.favicon}`);
    }
    return result;
});
exports.updateFaviconService = updateFaviconService;
