"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCategoryValidation = exports.categoryValidation = void 0;
const zod_1 = require("zod");
exports.categoryValidation = zod_1.z.object({
    name: zod_1.z.string({ required_error: 'Name is required.' }),
    order: zod_1.z.number().min(1),
});
exports.updateCategoryValidation = exports.categoryValidation.partial();
