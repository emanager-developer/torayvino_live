"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCouponValidation = exports.couponValidation = void 0;
const zod_1 = require("zod");
exports.couponValidation = zod_1.z.object({
    code: zod_1.z.string().min(1, 'Code is required'),
    minimumShopping: zod_1.z
        .number()
        .min(0, 'Minimum shopping amount must be positive'),
    discount: zod_1.z.number().min(0, 'Discount must be positive'),
    startDate: zod_1.z.string().min(1, 'Start date is required'),
    endDate: zod_1.z.string().min(1, 'End date is required'),
    startTime: zod_1.z.string().min(1, 'Start time is required'),
    endTime: zod_1.z.string().min(1, 'End time is required'),
    isUsageLimit: zod_1.z.boolean(),
    usageCount: zod_1.z.number().min(0, 'Usage count must be positive'),
    usageLimit: zod_1.z.number().min(0, 'Usage limit must be positive'),
    availableCount: zod_1.z.number().min(0, 'Available count must be positive'),
    isActive: zod_1.z.boolean(),
    isProduct: zod_1.z.boolean(),
    productIds: zod_1.z.array(zod_1.z.string()),
});
exports.updateCouponValidation = exports.couponValidation.partial();
