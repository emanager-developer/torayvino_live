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
exports.updateSMSConfigService = exports.getSMSConfigService = exports.createSMSConfigService = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const smsConfigModel_1 = require("./smsConfigModel");
const createSMSConfigService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield smsConfigModel_1.SMSConfig.findOne();
    if (isExist)
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'SMSConfig already exists!');
    const result = yield smsConfigModel_1.SMSConfig.create(data);
    return result;
});
exports.createSMSConfigService = createSMSConfigService;
const getSMSConfigService = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield smsConfigModel_1.SMSConfig.findOne();
    if (!result)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'SMSConfig not found!');
    return result;
});
exports.getSMSConfigService = getSMSConfigService;
const updateSMSConfigService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield smsConfigModel_1.SMSConfig.findById(id);
    if (!isExist)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'SMSConfig not found!');
    const result = yield smsConfigModel_1.SMSConfig.findByIdAndUpdate(id, data, { new: true });
    return result;
});
exports.updateSMSConfigService = updateSMSConfigService;
