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
exports.updateSeoService = exports.getSeoService = exports.createSeoService = void 0;
const AppError_1 = __importDefault(require("../../../errors/AppError"));
const seoModel_1 = require("./seoModel");
const http_status_1 = __importDefault(require("http-status"));
const createSeoService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield seoModel_1.SEO.findOne();
    if (isExist)
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'SEO already exist');
    const result = yield seoModel_1.SEO.create(data);
    return result;
});
exports.createSeoService = createSeoService;
const getSeoService = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield seoModel_1.SEO.findOne();
    return result;
});
exports.getSeoService = getSeoService;
const updateSeoService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield seoModel_1.SEO.findById(id);
    if (!isExist)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'SEO not found');
    const result = yield seoModel_1.SEO.findByIdAndUpdate(id, data, { new: true });
    return result;
});
exports.updateSeoService = updateSeoService;
