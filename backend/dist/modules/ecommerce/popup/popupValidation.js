"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.popupValidation = void 0;
const zod_1 = require("zod");
exports.popupValidation = zod_1.z.object({
    image: zod_1.z.string({ required_error: 'Popup image is required.' }),
    title: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    isActive: zod_1.z.boolean().optional().default(true),
});
