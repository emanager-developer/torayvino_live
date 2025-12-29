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
exports.deleteCouponService = exports.updateCouponService = exports.getSingleCouponService = exports.getAllCouponService = exports.applyCouponService = exports.addCouponService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../../errors/AppError"));
const couponModel_1 = require("./couponModel");
const addCouponService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield couponModel_1.Coupon.create(data);
    return result;
});
exports.addCouponService = addCouponService;
const applyCouponService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { coupon, totalShopping, productIds, items } = data;
    const isExist = yield couponModel_1.Coupon.findOne({ code: coupon });
    if (!isExist)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Coupon not found !');
    if (!(isExist === null || isExist === void 0 ? void 0 : isExist.isActive))
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Coupon is not active !');
    if ((isExist === null || isExist === void 0 ? void 0 : isExist.isUsageLimit) && isExist.availableCount === 0) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Coupon usage limit exceeded!');
    }
    // If coupon targets specific products, verify provided products are eligible
    let eligibleProductIds = [];
    let eligibleTotal = null;
    if (isExist.isProduct) {
        const allowed = new Set((isExist.productIds || []).map((id) => String(id)));
        if (items && Array.isArray(items) && items.length > 0) {
            // Calculate eligible total based on provided items
            eligibleTotal = 0;
            for (const it of items) {
                const pid = String(it._id);
                if (allowed.has(pid)) {
                    eligibleProductIds.push(pid);
                    const qty = Number((_a = it.quantity) !== null && _a !== void 0 ? _a : 1) || 1;
                    const price = Number(it.price) || 0;
                    const discountedPrice = price - (price * (it.discount || 0)) / 100;
                    eligibleTotal += discountedPrice * qty;
                }
            }
        }
        else if (productIds &&
            Array.isArray(productIds) &&
            productIds.length > 0) {
            eligibleProductIds = productIds
                .map((p) => String(p))
                .filter((p) => allowed.has(p));
            eligibleTotal = null;
        }
        else {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Product information required for this coupon');
        }
        if (eligibleProductIds.length === 0) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Coupon is not applicable to the provided products');
        }
    }
    if (Number(totalShopping) < Number(isExist === null || isExist === void 0 ? void 0 : isExist.minimumShopping)) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, `Minimum shopping amount is ${isExist === null || isExist === void 0 ? void 0 : isExist.minimumShopping}`);
    }
    const couponStartDate = new Date(`${isExist.startDate}T${isExist.startTime}`);
    const couponEndDate = new Date(`${isExist.endDate}T${isExist.endTime}`);
    const currentDate = new Date();
    if (currentDate < couponStartDate) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Coupon is not yet valid !');
    }
    if (currentDate > couponEndDate) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Coupon has expired !');
    }
    // Return coupon with eligibility info for product-specific coupons
    return Object.assign(Object.assign({}, isExist.toObject()), { eligibleProductIds: isExist.isProduct ? eligibleProductIds : undefined, eligibleTotal: isExist.isProduct ? eligibleTotal : undefined });
});
exports.applyCouponService = applyCouponService;
const getAllCouponService = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield couponModel_1.Coupon.find({});
    return result;
});
exports.getAllCouponService = getAllCouponService;
const getSingleCouponService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield couponModel_1.Coupon.findById(id);
    return result;
});
exports.getSingleCouponService = getSingleCouponService;
const updateCouponService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield couponModel_1.Coupon.findById(id);
    if (!isExist)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Coupon not found !');
    const result = yield couponModel_1.Coupon.findByIdAndUpdate(id, data, { new: true });
    return result;
});
exports.updateCouponService = updateCouponService;
const deleteCouponService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield couponModel_1.Coupon.findById(id);
    if (!isExist)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Coupon not found !');
    yield couponModel_1.Coupon.findByIdAndDelete(id);
    return true;
});
exports.deleteCouponService = deleteCouponService;
