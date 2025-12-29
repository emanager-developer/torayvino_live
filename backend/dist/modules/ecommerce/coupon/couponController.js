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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCouponController = exports.updateCouponController = exports.getSingleCouponController = exports.getAllCouponController = exports.applyCouponController = exports.addCouponController = void 0;
const catchAsync_1 = require("../../../utils/catchAsync");
const couponService_1 = require("./couponService");
exports.addCouponController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, couponService_1.addCouponService)(req.body);
    res.status(200).json({
        success: true,
        message: 'Coupon add successfully',
        data: result,
    });
}));
exports.applyCouponController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, couponService_1.applyCouponService)(req.body);
    res.status(200).json({
        success: true,
        message: 'Coupon applied successfully',
        data: result,
    });
}));
exports.getAllCouponController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, couponService_1.getAllCouponService)();
    res.status(200).json({
        success: true,
        message: 'Coupons get successfully',
        data: result,
    });
}));
exports.getSingleCouponController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield (0, couponService_1.getSingleCouponService)(id);
    res.status(200).json({
        success: true,
        message: 'Coupon get successfully',
        data: result,
    });
}));
exports.updateCouponController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield (0, couponService_1.updateCouponService)(id, req.body);
    res.status(200).json({
        success: true,
        message: 'Coupon update successfully',
        data: result,
    });
}));
exports.deleteCouponController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield (0, couponService_1.deleteCouponService)(id);
    res.status(200).json({
        success: true,
        message: 'Coupon delete successfully',
    });
}));
