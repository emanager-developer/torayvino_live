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
exports.getFaqCategoriesService = exports.deleteFaqService = exports.updateFaqService = exports.getSingleFaqService = exports.getAllFaqForAdminService = exports.getAllFaqService = exports.addFaqService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../../errors/AppError"));
const faqModel_1 = require("./faqModel");
const addFaqService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield faqModel_1.FAQ.create(payload);
    return result;
});
exports.addFaqService = addFaqService;
const getAllFaqService = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield faqModel_1.FAQ.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
    return result;
});
exports.getAllFaqService = getAllFaqService;
const getAllFaqForAdminService = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield faqModel_1.FAQ.find().sort({ order: 1, createdAt: -1 });
    return result;
});
exports.getAllFaqForAdminService = getAllFaqForAdminService;
const getSingleFaqService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield faqModel_1.FAQ.findById(id);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'FAQ not found');
    }
    return result;
});
exports.getSingleFaqService = getSingleFaqService;
const updateFaqService = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield faqModel_1.FAQ.findByIdAndUpdate(id, payload, { new: true });
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'FAQ not found');
    }
    return result;
});
exports.updateFaqService = updateFaqService;
const deleteFaqService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield faqModel_1.FAQ.findByIdAndDelete(id);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'FAQ not found');
    }
    return result;
});
exports.deleteFaqService = deleteFaqService;
const getFaqCategoriesService = () => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield faqModel_1.FAQ.distinct('category', { isActive: true });
    return categories;
});
exports.getFaqCategoriesService = getFaqCategoriesService;
