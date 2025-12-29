"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateComplaintFormValidation = exports.complaintFormValidation = void 0;
const zod_1 = require("zod");
exports.complaintFormValidation = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Name is required'),
    phone: zod_1.z.string().min(1, 'Phone is required'),
    email: zod_1.z.string().email('Invalid email address').optional().or(zod_1.z.literal('')),
    device: zod_1.z.string().min(1, 'Device selection is required'),
    problemDescription: zod_1.z.string().min(1, 'Problem description is required'),
});
exports.updateComplaintFormValidation = exports.complaintFormValidation.partial();
