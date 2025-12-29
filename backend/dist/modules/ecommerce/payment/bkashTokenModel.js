"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BkashToken = void 0;
const mongoose_1 = require("mongoose");
const bkashTokenSchema = new mongoose_1.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    expiry: {
        type: Date,
        required: true,
    },
}, { timestamps: true });
exports.BkashToken = (0, mongoose_1.model)('BkashToken', bkashTokenSchema);
