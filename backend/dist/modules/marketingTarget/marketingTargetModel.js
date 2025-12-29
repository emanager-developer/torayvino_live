"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketingTarget = void 0;
const mongoose_1 = require("mongoose");
const marketingTargetSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    month: {
        type: Number,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    addedBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, { timestamps: true });
exports.MarketingTarget = (0, mongoose_1.model)('MarketingTarget', marketingTargetSchema);
