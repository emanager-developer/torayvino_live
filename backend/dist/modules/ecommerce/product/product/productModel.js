"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    thumbnail: {
        type: String,
        required: true,
    },
    galleries: {
        type: [String],
    },
    title: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    subCategory: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'SubCategory',
    },
    subSubCategory: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'SubSubCategory',
    },
    brand: {
        type: String,
    },
    tags: {
        type: [String],
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
    },
    discount: {
        type: Number,
    },
    stock: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        default: 0,
    },
    reviewer: {
        type: Number,
        default: 0,
    },
    featured: {
        type: Boolean,
        default: false,
    },
    isVariant: {
        type: Boolean,
        default: false,
    },
    variants: [
        {
            color: {
                type: String,
            },
            colorCode: {
                type: String,
            },
            size: {
                type: String,
            },
            stock: {
                type: Number,
            },
            price: {
                type: Number,
            },
            image: {
                type: String,
            },
            sku: {
                type: String,
            },
        },
    ],
    specifications: [
        {
            title: { type: String, required: true },
            description: { type: String, required: true },
        },
    ],
    feature: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Feature',
        },
    ],
    shortFeature: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'ShortFeature',
        },
    ],
    faq: [
        {
            question: { type: String, required: true },
            answer: { type: String, required: true },
        },
    ],
    productManual: {
        type: String,
    },
    disclaimer: {
        type: String,
    },
    isBundle: {
        type: Boolean,
        default: false,
    },
    bundlePurchaseQuantity: {
        type: Number,
    },
    bundleQuantity: {
        type: Number,
    },
    kits: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Kit',
        },
    ],
}, { timestamps: true });
exports.Product = (0, mongoose_1.model)('Product', productSchema);
