"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadStatus = void 0;
const mongoose_1 = require("mongoose");
const leadStatusSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    value: {
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
exports.LeadStatus = (0, mongoose_1.model)('LeadStatus', leadStatusSchema);
