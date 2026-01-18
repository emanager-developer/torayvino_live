"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlashDeal = void 0;
const mongoose_1 = require("mongoose");
const flashProductSchema = new mongoose_1.Schema({
    product: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    discount: {
        type: Number,
        required: true,
        min: 0,
    },
    discountType: {
        type: String,
        default: '1',
    },
}, { _id: true });
const flashDealSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    startDate: {
        type: String,
        required: true,
    },
    endDate: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: true,
    },
    flashProducts: {
        type: [flashProductSchema],
        default: [],
    },
}, { timestamps: true });
flashDealSchema.index({ status: 1 });
flashDealSchema.index({ startDate: 1, endDate: 1 });
exports.FlashDeal = (0, mongoose_1.model)('FlashDeal', flashDealSchema);
