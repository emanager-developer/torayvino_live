"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSupportFormValidation = exports.supportFormValidation = void 0;
const zod_1 = require("zod");
exports.supportFormValidation = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Name is required'),
    phone: zod_1.z.string().min(1, 'Phone is required'),
    email: zod_1.z
        .string()
        .email("Invalid email address")
        .optional()
        .or(zod_1.z.literal("")),
    subject: zod_1.z.string().optional(),
    message: zod_1.z.string().min(1, 'Message is required'),
});
exports.updateSupportFormValidation = exports.supportFormValidation.partial();
