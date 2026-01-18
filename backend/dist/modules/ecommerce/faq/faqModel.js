"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FAQ = void 0;
const mongoose_1 = require("mongoose");
const faqSchema = new mongoose_1.Schema({
    category: { type: String, required: true },
    question: { type: String, required: true },
    answer: { type: String, required: true },
    order: { type: Number, required: true, default: 0 },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });
exports.FAQ = (0, mongoose_1.model)('FAQ', faqSchema);
