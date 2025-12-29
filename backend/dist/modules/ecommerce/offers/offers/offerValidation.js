"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferValidations = void 0;
const zod_1 = require("zod");
const createOfferValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'Offer name is required',
            invalid_type_error: 'Offer name must be a string',
        }).min(1, 'Offer name cannot be empty'),
        description: zod_1.z.string({
            required_error: 'Description is required',
            invalid_type_error: 'Description must be a string',
        }).min(1, 'Description cannot be empty'),
        products: zod_1.z.array(zod_1.z.string()).optional(),
        banners: zod_1.z.object({
            desktop: zod_1.z.array(zod_1.z.string()).optional(),
            mobile: zod_1.z.array(zod_1.z.string()).optional(),
        }).optional(),
        isActive: zod_1.z.boolean().optional(),
        startDate: zod_1.z.string().datetime().optional(),
        endDate: zod_1.z.string().datetime().optional(),
        discountPercentage: zod_1.z.number().min(0).max(100).optional(),
    }),
});
const updateOfferValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, 'Offer name cannot be empty').optional(),
        description: zod_1.z.string().min(1, 'Description cannot be empty').optional(),
        products: zod_1.z.array(zod_1.z.string()).optional(),
        banners: zod_1.z.object({
            desktop: zod_1.z.array(zod_1.z.string()).optional(),
            mobile: zod_1.z.array(zod_1.z.string()).optional(),
        }).optional(),
        isActive: zod_1.z.boolean().optional(),
        startDate: zod_1.z.string().datetime().optional(),
        endDate: zod_1.z.string().datetime().optional(),
        discountPercentage: zod_1.z.number().min(0).max(100).optional(),
    }),
});
exports.OfferValidations = {
    createOfferValidationSchema,
    updateOfferValidationSchema,
};
