"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadPurpose = void 0;
const mongoose_1 = require("mongoose");
const leadPurposeSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    order: {
        type: Number,
        required: true,
        default: 1,
    },
}, { timestamps: true });
exports.LeadPurpose = (0, mongoose_1.model)('LeadPurpose', leadPurposeSchema);
