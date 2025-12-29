"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateNotesValidation = exports.updateStatusValidation = exports.updateWarrantyFormValidation = exports.warrantyFormValidation = void 0;
const zod_1 = require("zod");
exports.warrantyFormValidation = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Name is required'),
    phone: zod_1.z.string().min(1, 'Phone is required'),
    email: zod_1.z.string().email('Invalid email address').optional().or(zod_1.z.literal('')),
    device: zod_1.z.string().min(1, 'Device selection is required'),
    problemDescription: zod_1.z.string().min(1, 'Problem description is required'),
    address: zod_1.z.string().min(1, 'Address is required'),
    purchaseDate: zod_1.z.string().min(1, 'Purchase date is required'),
    invoiceNumber: zod_1.z.string().min(1, 'Invoice number is required'),
    purchasePlace: zod_1.z.string().min(1, 'Purchase place is required'),
    serviceMethod: zod_1.z.string().min(1, 'Service method is required'),
    status: zod_1.z.string().min(1, 'Status is required'),
    problemCategory: zod_1.z.string().optional(),
    notes: zod_1.z.string().optional(),
});
exports.updateWarrantyFormValidation = exports.warrantyFormValidation.partial();
exports.updateStatusValidation = zod_1.z.object({
    status: zod_1.z.string().min(1, 'Status is required'),
});
exports.updateNotesValidation = zod_1.z.object({
    notes: zod_1.z.string().min(1, 'Notes is required'),
});
