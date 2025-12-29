"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Offer = void 0;
const mongoose_1 = require("mongoose");
const offerSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    banners: {
        desktop: {
            type: [String],
            default: [],
        },
        mobile: {
            type: [String],
            default: [],
        },
    },
    products: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: 'Product',
        default: [],
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
    discountPercentage: {
        type: Number,
        min: 0,
        max: 100,
    },
}, {
    timestamps: true,
});
// Index for better query performance
offerSchema.index({ slug: 1 });
offerSchema.index({ isActive: 1 });
offerSchema.index({ startDate: 1, endDate: 1 });
exports.Offer = (0, mongoose_1.model)('Offer', offerSchema);
