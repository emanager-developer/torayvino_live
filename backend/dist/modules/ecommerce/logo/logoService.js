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
exports.updateLogoService = exports.getLogoService = exports.addLogoService = void 0;
const logoModel_1 = require("./logoModel");
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../../errors/AppError"));
const deleteFile_1 = require("../../../utils/deleteFile");
const addLogoService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield logoModel_1.Logo.findOne();
    if (isExist) {
        (0, deleteFile_1.deleteFile)(`./uploads/${data.logo}`);
        throw new AppError_1.default(http_status_1.default.CONFLICT, 'Logo already exist !');
    }
    const result = yield logoModel_1.Logo.create(data);
    return result;
});
exports.addLogoService = addLogoService;
const getLogoService = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield logoModel_1.Logo.findOne();
    return result;
});
exports.getLogoService = getLogoService;
const updateLogoService = (data, id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield logoModel_1.Logo.findById(id);
    if (!isExist) {
        (0, deleteFile_1.deleteFile)(`./uploads/${data.logo}`);
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Logo not found !');
    }
    const result = yield logoModel_1.Logo.findByIdAndUpdate(id, data, { new: true });
    if ((result === null || result === void 0 ? void 0 : result.logo) && (data === null || data === void 0 ? void 0 : data.logo) && (isExist === null || isExist === void 0 ? void 0 : isExist.logo)) {
        (0, deleteFile_1.deleteFile)(`./uploads/${isExist === null || isExist === void 0 ? void 0 : isExist.logo}`);
    }
    return result;
});
exports.updateLogoService = updateLogoService;
