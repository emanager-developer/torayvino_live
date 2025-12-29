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
exports.deleteColorService = exports.updateColorService = exports.getSingleColorService = exports.getAllColorService = exports.addColorService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../../../errors/AppError"));
const colorModel_1 = require("./colorModel");
const addColorService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield colorModel_1.Color.create(data);
    return result;
});
exports.addColorService = addColorService;
const getAllColorService = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield colorModel_1.Color.find({});
    return result;
});
exports.getAllColorService = getAllColorService;
const getSingleColorService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield colorModel_1.Color.findById(id);
    return result;
});
exports.getSingleColorService = getSingleColorService;
const updateColorService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield colorModel_1.Color.findById(id);
    if (!isExist)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Color not found !');
    const result = yield colorModel_1.Color.findByIdAndUpdate(id, data, { new: true });
    return result;
});
exports.updateColorService = updateColorService;
const deleteColorService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield colorModel_1.Color.findById(id);
    if (!isExist)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Color not found !');
    yield colorModel_1.Color.findByIdAndDelete(id);
    return true;
});
exports.deleteColorService = deleteColorService;
