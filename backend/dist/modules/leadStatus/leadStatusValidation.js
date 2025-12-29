"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leadStatusValidation = void 0;
const zod_1 = require("zod");
exports.leadStatusValidation = zod_1.z.object({
    name: zod_1.z.string().min(1, { message: 'Name is required' }),
    order: zod_1.z
        .number()
        .min(1, { message: 'Order must be greater than or equal to 1' })
        .max(100, { message: 'Order must be less than or equal to 100' }),
});
