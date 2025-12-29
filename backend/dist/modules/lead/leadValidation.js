"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateLeadValidation = exports.leadValidation = void 0;
const zod_1 = require("zod");
exports.leadValidation = zod_1.z.object({
    date: zod_1.z.string().optional(),
    name: zod_1.z.string().min(1, { message: 'Name is required' }),
    email: zod_1.z.string().optional(),
    phone: zod_1.z.string().min(1, { message: 'Phone is required' }),
    company: zod_1.z.string().optional(),
    address: zod_1.z.string().optional(),
    purpose: zod_1.z.string().min(1, { message: 'Purpose is required' }),
    source: zod_1.z.string().min(1, { message: 'Source is required' }),
    link: zod_1.z.string().optional(),
    conversation: zod_1.z
        .array(zod_1.z.object({
        date: zod_1.z.string(),
        message: zod_1.z.string(),
    }))
        .optional(),
    serviceBy: zod_1.z.string(),
    addedBy: zod_1.z.string(),
    updatedBy: zod_1.z.string().optional(),
});
exports.updateLeadValidation = exports.leadValidation.partial();
