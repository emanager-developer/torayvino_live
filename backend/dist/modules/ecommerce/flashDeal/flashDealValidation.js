"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFlashDealValidation = exports.flashDealValidation = void 0;
const zod_1 = require("zod");
const productIdSchema = zod_1.z
    .union([
    zod_1.z.string().min(1),
    zod_1.z.object({
        _id: zod_1.z.string().min(1),
    }),
])
    .transform((val) => (typeof val === 'string' ? val : val._id));
const flashProductValidation = zod_1.z.object({
    product: productIdSchema,
    discount: zod_1.z.coerce.number().min(0, 'Discount must be >= 0'),
    discountType: zod_1.z.string().optional(),
});
exports.flashDealValidation = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Title is required'),
    startDate: zod_1.z.string().min(1, 'Start date is required'),
    endDate: zod_1.z.string().min(1, 'End date is required'),
    status: zod_1.z.boolean().optional(),
    flashProducts: zod_1.z.array(flashProductValidation).min(1, 'At least 1 product is required'),
});
exports.updateFlashDealValidation = exports.flashDealValidation.partial();
