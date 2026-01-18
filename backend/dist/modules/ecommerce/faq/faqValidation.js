"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFaqZodSchema = exports.addFaqZodSchema = void 0;
const zod_1 = require("zod");
exports.addFaqZodSchema = zod_1.z.object({
    category: zod_1.z.string({ required_error: 'Category is required' }),
    question: zod_1.z.string({ required_error: 'Question is required' }),
    answer: zod_1.z.string({ required_error: 'Answer is required' }),
    order: zod_1.z.string().optional(),
    isActive: zod_1.z.boolean().optional(),
});
exports.updateFaqZodSchema = zod_1.z.object({
    category: zod_1.z.string().optional(),
    question: zod_1.z.string().optional(),
    answer: zod_1.z.string().optional(),
    order: zod_1.z.string().optional(),
    isActive: zod_1.z.boolean().optional(),
});
