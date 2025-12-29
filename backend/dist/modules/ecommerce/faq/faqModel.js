"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Faq = void 0;
const mongoose_1 = require("mongoose");
const faqSchema = new mongoose_1.Schema({
    question: { type: String, required: true },
    ans: { type: String, required: true },
});
exports.Faq = (0, mongoose_1.model)('Faq', faqSchema);
