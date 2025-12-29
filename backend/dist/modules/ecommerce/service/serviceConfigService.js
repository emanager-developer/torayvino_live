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
exports.deleteServiceConfigService = exports.updateServiceConfigService = exports.getSingleServiceConfigService = exports.getAllServiceConfigService = exports.addServiceConfigService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../../errors/AppError"));
const serviceConfigModel_1 = require("./serviceConfigModel");
const addServiceConfigService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield serviceConfigModel_1.ServiceConfig.create(data);
    return result;
});
exports.addServiceConfigService = addServiceConfigService;
const getAllServiceConfigService = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield serviceConfigModel_1.ServiceConfig.find({});
    return result;
});
exports.getAllServiceConfigService = getAllServiceConfigService;
const getSingleServiceConfigService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield serviceConfigModel_1.ServiceConfig.findById(id);
    return result;
});
exports.getSingleServiceConfigService = getSingleServiceConfigService;
const updateServiceConfigService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield serviceConfigModel_1.ServiceConfig.findById(id);
    if (!isExist)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'ServiceConfig not found !');
    const result = yield serviceConfigModel_1.ServiceConfig.findByIdAndUpdate(id, data, {
        new: true,
    });
    return result;
});
exports.updateServiceConfigService = updateServiceConfigService;
const deleteServiceConfigService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield serviceConfigModel_1.ServiceConfig.findById(id);
    if (!isExist)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'ServiceConfig not found !');
    yield serviceConfigModel_1.ServiceConfig.findByIdAndDelete(id);
    return true;
});
exports.deleteServiceConfigService = deleteServiceConfigService;
