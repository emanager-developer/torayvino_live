"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Coupon = void 0;
const mongoose_1 = require("mongoose");
const couponSchema = new mongoose_1.Schema({
    code: { type: String, required: true },
    minimumShopping: { type: Number, required: true },
    discount: { type: Number, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    isUsageLimit: { type: Boolean, required: true, default: false },
    usageLimit: { type: Number, default: 0 },
    usageCount: { type: Number, default: 0 },
    availableCount: { type: Number, default: 0 },
    isActive: { type: Boolean, required: true, default: true },
    isProduct: { type: Boolean, required: true, default: false },
    productIds: { type: [String], default: [] },
});
exports.Coupon = (0, mongoose_1.model)('Coupon', couponSchema);
