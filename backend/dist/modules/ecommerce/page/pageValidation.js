"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePageValidation = exports.pageValidation = void 0;
const zod_1 = require("zod");
exports.pageValidation = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Title is required'),
    content: zod_1.z.string().min(1, 'Content is required'),
});
exports.updatePageValidation = exports.pageValidation.partial();
