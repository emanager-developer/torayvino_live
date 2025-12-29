"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSubCategoryValidation = exports.subCategoryValidation = void 0;
const zod_1 = require("zod");
exports.subCategoryValidation = zod_1.z.object({
    name: zod_1.z.string().min(2).max(100),
    category: zod_1.z.string({ required_error: 'Category is required!' }),
});
exports.updateSubCategoryValidation = exports.subCategoryValidation.partial();
