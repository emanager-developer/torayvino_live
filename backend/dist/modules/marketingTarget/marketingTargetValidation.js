"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMarketingTargetValidation = exports.marketingTargetValidation = void 0;
const zod_1 = require("zod");
exports.marketingTargetValidation = zod_1.z.object({
    user: zod_1.z.string().nonempty('User ID is required'),
    month: zod_1.z.number().int().min(1).max(12, 'Month must be between 1 and 12'),
    year: zod_1.z.number().int().min(2000, 'Year must be at least 2000'),
    amount: zod_1.z.number().positive('Amount must be a positive number'),
    addedBy: zod_1.z.string().nonempty('Added By ID is required'),
});
exports.updateMarketingTargetValidation = exports.marketingTargetValidation.partial();
