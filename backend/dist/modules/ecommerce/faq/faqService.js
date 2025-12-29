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
exports.deleteFaqService = exports.updateFaqService = exports.getSingleFaqService = exports.getAllFaqService = exports.addFaqService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../../errors/AppError"));
const faqModel_1 = require("./faqModel");
const addFaqService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield faqModel_1.Faq.create(data);
    return result;
});
exports.addFaqService = addFaqService;
const getAllFaqService = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield faqModel_1.Faq.find({});
    return result;
});
exports.getAllFaqService = getAllFaqService;
const getSingleFaqService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield faqModel_1.Faq.findById(id);
    return result;
});
exports.getSingleFaqService = getSingleFaqService;
const updateFaqService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield faqModel_1.Faq.findById(id);
    if (!isExist)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Faq not found !');
    const result = yield faqModel_1.Faq.findByIdAndUpdate(id, data, { new: true });
    return result;
});
exports.updateFaqService = updateFaqService;
const deleteFaqService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield faqModel_1.Faq.findById(id);
    if (!isExist)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Faq not found !');
    yield faqModel_1.Faq.findByIdAndDelete(id);
    return true;
});
exports.deleteFaqService = deleteFaqService;
