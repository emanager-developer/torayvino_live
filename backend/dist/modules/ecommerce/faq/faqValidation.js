"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFaqValidation = exports.faqValidation = void 0;
const zod_1 = require("zod");
exports.faqValidation = zod_1.z.object({
    question: zod_1.z.string().min(1, 'Question is required'),
    ans: zod_1.z.string().min(1, 'Answer is required'),
});
exports.updateFaqValidation = exports.faqValidation.partial();
