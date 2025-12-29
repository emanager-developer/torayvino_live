"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordValidation = exports.updatePasswordValidation = exports.verifyPhoneAndRegisterValidation = exports.updateCustomerValidation = exports.customerValidation = void 0;
const zod_1 = require("zod");
exports.customerValidation = zod_1.z.object({
    name: zod_1.z.string().nonempty('Name is required'),
    phone: zod_1.z.string().nonempty('Phone is required'),
    source: zod_1.z.enum(['lead', 'e-commerce']),
});
exports.updateCustomerValidation = exports.customerValidation.partial();
exports.verifyPhoneAndRegisterValidation = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Name is required'),
    phone: zod_1.z.string().min(1, 'Phone is required'),
    email: zod_1.z.string().email('Invalid email').optional().or(zod_1.z.literal('')),
    password: zod_1.z.string().min(8, 'Password must be at least 8 characters'),
    verificationId: zod_1.z.string().min(1, 'Verification ID is required'),
    tempToken: zod_1.z.string().min(1, 'Temporary token is required'),
});
exports.updatePasswordValidation = zod_1.z.object({
    oldPassword: zod_1.z.string().min(8, 'Old password must be at least 8 characters'),
    newPassword: zod_1.z.string().min(8, 'New password must be at least 8 characters'),
});
exports.resetPasswordValidation = zod_1.z.object({
    phone: zod_1.z.string().min(1, 'Phone is required'),
    verificationId: zod_1.z.string().min(1, 'Verification ID is required'),
    newPassword: zod_1.z.string().min(8, 'New password must be at least 8 characters'),
});
