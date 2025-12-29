"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBankValidation = exports.createBankValidation = void 0;
const zod_1 = require("zod");
const emiOptionSchema = zod_1.z.object({
    months: zod_1.z.number({
        required_error: 'EMI months is required',
    }).min(1, 'EMI months must be at least 1'),
    chargePercentage: zod_1.z.number({
        required_error: 'Charge percentage is required',
    }).min(0, 'Charge percentage cannot be negative'),
});
// Validation for form data (after parsing in middleware)
exports.createBankValidation = zod_1.z.object({
    bankName: zod_1.z.string({
        required_error: 'Bank name is required',
    }).min(1, 'Bank name cannot be empty'),
    emiOptions: zod_1.z.array(emiOptionSchema).min(1, 'At least one EMI option is required'),
});
exports.updateBankValidation = zod_1.z.object({
    bankName: zod_1.z.string().min(1, 'Bank name cannot be empty').optional(),
    emiOptions: zod_1.z.array(emiOptionSchema).min(1, 'At least one EMI option is required').optional(),
});
