"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSubSubCategoryValidation = exports.subSubCategoryValidation = void 0;
const zod_1 = require("zod");
exports.subSubCategoryValidation = zod_1.z.object({
    name: zod_1.z.string().min(2).max(100),
    category: zod_1.z.string({ required_error: 'Category is required!' }),
    subCategory: zod_1.z.string({ required_error: 'SubCategory is required!' }),
});
exports.updateSubSubCategoryValidation = exports.subSubCategoryValidation.partial();
