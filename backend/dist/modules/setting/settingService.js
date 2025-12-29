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
exports.updateSettingService = exports.getSettingService = exports.createSettingService = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const deleteFile_1 = require("../../utils/deleteFile");
const settingModel_1 = require("./settingModel");
const createSettingService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield settingModel_1.Setting.findOne();
    if (isExist)
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Setting already exists!');
    const result = yield settingModel_1.Setting.create(data);
    return result;
});
exports.createSettingService = createSettingService;
const getSettingService = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield settingModel_1.Setting.findOne();
    if (!result)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Setting not found!');
    return result;
});
exports.getSettingService = getSettingService;
const updateSettingService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield settingModel_1.Setting.findById(id);
    if (!isExist) {
        if (data === null || data === void 0 ? void 0 : data.favicon)
            (0, deleteFile_1.deleteFile)(data.favicon);
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Setting not found!');
    }
    const result = yield settingModel_1.Setting.findByIdAndUpdate(id, data, {
        new: true,
    });
    if (result && (data === null || data === void 0 ? void 0 : data.favicon))
        (0, deleteFile_1.deleteFile)(isExist === null || isExist === void 0 ? void 0 : isExist.favicon);
    return result;
});
exports.updateSettingService = updateSettingService;
