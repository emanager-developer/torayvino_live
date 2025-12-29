"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const emiOptionSchema = new mongoose_1.Schema({
    months: {
        type: Number,
        required: [true, 'EMI months is required'],
    },
    chargePercentage: {
        type: Number,
        required: [true, 'Charge percentage is required'],
    },
}, {
    _id: false,
});
const bankSchema = new mongoose_1.Schema({
    bankName: {
        type: String,
        required: [true, 'Bank name is required'],
        trim: true,
    },
    logo: {
        type: String,
        trim: true,
    },
    emiOptions: {
        type: [emiOptionSchema],
        default: [],
    },
}, {
    timestamps: true,
    versionKey: false,
});
const BankModel = (0, mongoose_1.model)('Bank', bankSchema);
exports.default = BankModel;
