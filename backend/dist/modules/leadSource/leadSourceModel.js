"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadSource = void 0;
const mongoose_1 = require("mongoose");
const leadSourceSchema = new mongoose_1.Schema({
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
exports.LeadSource = (0, mongoose_1.model)('LeadSource', leadSourceSchema);
