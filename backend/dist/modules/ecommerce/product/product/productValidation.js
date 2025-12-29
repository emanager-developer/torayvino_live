"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductValidation = exports.productValidation = void 0;
const zod_1 = require("zod");
const specificationSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Specification title is required'),
    description: zod_1.z.string().min(1, 'Specification description is required'),
});
const faqSchema = zod_1.z.object({
    question: zod_1.z.string().min(1, 'FAQ question is required'),
    answer: zod_1.z.string().min(1, 'FAQ answer is required'),
});
const variantSchema = zod_1.z.object({
    sku: zod_1.z.string().min(1, 'SKU is required'),
    color: zod_1.z.string().optional(),
    colorCode: zod_1.z.string().optional(),
    size: zod_1.z.string().optional(),
    stock: zod_1.z.number().min(0, 'Stock must be non-negative'),
    price: zod_1.z.number().min(0, 'Price must be non-negative'),
    image: zod_1.z.string().optional(),
});
exports.productValidation = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Title is required'),
    description: zod_1.z.string().min(1, 'Description is required'),
    category: zod_1.z.string().min(1, 'Category is required'),
    subCategory: zod_1.z.string().optional(),
    subSubCategory: zod_1.z.string().optional(),
    brand: zod_1.z.string().optional(),
    tags: zod_1.z.array(zod_1.z.string()).optional(),
    specifications: zod_1.z.array(specificationSchema).optional().default([]),
    feature: zod_1.z.array(zod_1.z.string()).optional().default([]),
    shortFeature: zod_1.z.array(zod_1.z.string()).optional().default([]),
    faq: zod_1.z.array(faqSchema).optional().default([]),
    disclaimer: zod_1.z.string().optional(),
    gkk: zod_1.z.array(zod_1.z.string()).optional().default([]),
    productType: zod_1.z.enum(['device', 'gkk']).default('device'),
    price: zod_1.z.number().min(0, 'Price must be non-negative'),
    discount: zod_1.z.number().min(0).max(100).optional(),
    stock: zod_1.z.number().min(0, 'Stock must be non-negative'),
    featured: zod_1.z.boolean().default(false),
    isVariant: zod_1.z.boolean().default(false),
    variants: zod_1.z.array(variantSchema).optional().default([]),
    isBundle: zod_1.z.boolean().default(false),
    bundlePurchaseQuantity: zod_1.z.number().optional(),
    bundleQuantity: zod_1.z.number().optional(),
});
exports.updateProductValidation = exports.productValidation.partial();
