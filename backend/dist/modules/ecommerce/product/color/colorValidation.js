"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateColorValidation = exports.colorValidation = void 0;
const zod_1 = require("zod");
exports.colorValidation = zod_1.z.object({
    name: zod_1.z.string().min(2).max(100),
    code: zod_1.z.string().min(2).max(100),
});
exports.updateColorValidation = exports.colorValidation.partial();
