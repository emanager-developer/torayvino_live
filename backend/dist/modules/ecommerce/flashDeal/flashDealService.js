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
exports.deleteFlashDealService = exports.updateFlashDealService = exports.toggleFlashDealStatusService = exports.getFlashDealByIdService = exports.getActiveFlashDealService = exports.getAllFlashDealService = exports.addFlashDealService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../../errors/AppError"));
const flashDealModel_1 = require("./flashDealModel");
const todayISODate = () => new Date().toISOString().slice(0, 10); // YYYY-MM-DD
const normalizeFlashDealPayload = (data) => {
    const normalized = Object.assign({}, data);
    if (Array.isArray(data === null || data === void 0 ? void 0 : data.flashProducts)) {
        normalized.flashProducts = data.flashProducts
            .filter(Boolean)
            .map((fp) => {
            var _a;
            return (Object.assign(Object.assign({}, fp), { product: typeof (fp === null || fp === void 0 ? void 0 : fp.product) === 'string'
                    ? fp.product
                    : ((_a = fp === null || fp === void 0 ? void 0 : fp.product) === null || _a === void 0 ? void 0 : _a._id) || (fp === null || fp === void 0 ? void 0 : fp.product), discount: (fp === null || fp === void 0 ? void 0 : fp.discount) !== undefined ? Number(fp.discount) : fp.discount }));
        });
    }
    return normalized;
};
const addFlashDealService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const payload = normalizeFlashDealPayload(Object.assign(Object.assign({}, data), { status: (_a = data.status) !== null && _a !== void 0 ? _a : true }));
    const result = yield flashDealModel_1.FlashDeal.create(payload);
    return result;
});
exports.addFlashDealService = addFlashDealService;
const getAllFlashDealService = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield flashDealModel_1.FlashDeal.find({})
        .sort({ createdAt: -1 })
        .populate('flashProducts.product');
    return result;
});
exports.getAllFlashDealService = getAllFlashDealService;
const getActiveFlashDealService = () => __awaiter(void 0, void 0, void 0, function* () {
    const today = todayISODate();
    const result = yield flashDealModel_1.FlashDeal.find({
        status: true,
        startDate: { $lte: today },
        endDate: { $gte: today },
    })
        .sort({ createdAt: -1 })
        .populate('flashProducts.product');
    return result;
});
exports.getActiveFlashDealService = getActiveFlashDealService;
const getFlashDealByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield flashDealModel_1.FlashDeal.findById(id).populate('flashProducts.product');
    return result;
});
exports.getFlashDealByIdService = getFlashDealByIdService;
const toggleFlashDealStatusService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield flashDealModel_1.FlashDeal.findById(id);
    if (!isExist)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Flash Deal not found');
    const result = yield flashDealModel_1.FlashDeal.findByIdAndUpdate(id, { status: !isExist.status }, { new: true });
    return result;
});
exports.toggleFlashDealStatusService = toggleFlashDealStatusService;
const updateFlashDealService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield flashDealModel_1.FlashDeal.findById(id);
    if (!isExist)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Flash Deal not found');
    const payload = normalizeFlashDealPayload(data);
    const result = yield flashDealModel_1.FlashDeal.findByIdAndUpdate(id, payload, { new: true });
    return result;
});
exports.updateFlashDealService = updateFlashDealService;
const deleteFlashDealService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield flashDealModel_1.FlashDeal.findById(id);
    if (!isExist)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Flash Deal not found');
    yield flashDealModel_1.FlashDeal.findByIdAndDelete(id);
    return true;
});
exports.deleteFlashDealService = deleteFlashDealService;
