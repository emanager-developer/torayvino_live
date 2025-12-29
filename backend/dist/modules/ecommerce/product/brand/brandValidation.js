"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBrandValidation = exports.brandValidation = void 0;
const zod_1 = require("zod");
exports.brandValidation = zod_1.z.object({
    name: zod_1.z.string({ required_error: 'Name is required.' }),
});
exports.updateBrandValidation = exports.brandValidation.partial();
