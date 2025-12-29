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
exports.updateAboutService = exports.getAboutService = exports.addAboutService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../../errors/AppError"));
const deleteFile_1 = require("../../../utils/deleteFile");
const aboutModel_1 = require("./aboutModel");
const addAboutService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield aboutModel_1.About.findOne();
    if (isExist) {
        (0, deleteFile_1.deleteFile)(`./uploads/${data.image}`);
        throw new AppError_1.default(http_status_1.default.CONFLICT, 'About already exist !');
    }
    const result = yield aboutModel_1.About.create(data);
    return result;
});
exports.addAboutService = addAboutService;
const getAboutService = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield aboutModel_1.About.findOne();
    return result;
});
exports.getAboutService = getAboutService;
const updateAboutService = (data, id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield aboutModel_1.About.findById(id);
    if (!isExist) {
        (0, deleteFile_1.deleteFile)(`./uploads/${data.image}`);
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'About not found !');
    }
    const result = yield aboutModel_1.About.findByIdAndUpdate(id, data, { new: true });
    if (result && (data === null || data === void 0 ? void 0 : data.image))
        (0, deleteFile_1.deleteFile)(`./uploads/${isExist === null || isExist === void 0 ? void 0 : isExist.image}`);
    return result;
});
exports.updateAboutService = updateAboutService;
