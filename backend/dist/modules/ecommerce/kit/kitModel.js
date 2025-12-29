"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Kit = void 0;
const mongoose_1 = require("mongoose");
const kitSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    price: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        default: 0,
        min: 0,
        max: 100,
    },
    stock: {
        type: Number,
        default: 0,
        min: 0,
    },
    image: {
        type: String,
        required: true,
    },
    products: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Product',
        },
    ],
    specifications: [
        {
            title: { type: String, required: true },
            description: { type: String, required: true },
        },
    ],
    faq: [
        {
            question: { type: String, required: true },
            answer: { type: String, required: true },
        },
    ],
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
}, { timestamps: true });
exports.Kit = (0, mongoose_1.model)('Kit', kitSchema);
