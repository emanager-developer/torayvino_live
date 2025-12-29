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
exports.updateCompanyInfoService = exports.getCompanyInfoService = exports.addCompanyInfoService = void 0;
const AppError_1 = __importDefault(require("../../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const companyInfoModel_1 = require("./companyInfoModel");
const addCompanyInfoService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield companyInfoModel_1.CompanyInfo.findOne();
    if (isExist)
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'CompanyInfo already exist');
    const result = yield companyInfoModel_1.CompanyInfo.create(data);
    return result;
});
exports.addCompanyInfoService = addCompanyInfoService;
const getCompanyInfoService = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield companyInfoModel_1.CompanyInfo.findOne();
    return result;
});
exports.getCompanyInfoService = getCompanyInfoService;
const updateCompanyInfoService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield companyInfoModel_1.CompanyInfo.findById(id);
    if (!isExist)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'CompanyInfo not found');
    const result = yield companyInfoModel_1.CompanyInfo.findByIdAndUpdate(id, data, { new: true });
    return result;
});
exports.updateCompanyInfoService = updateCompanyInfoService;
