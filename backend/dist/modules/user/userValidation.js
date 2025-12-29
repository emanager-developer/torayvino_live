"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetAdminPasswordValidation = exports.verifyAdminResetEmailValidation = exports.sendAdminResetEmailValidation = exports.userValidation = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const zod_1 = require("zod");
exports.userValidation = zod_1.z.object({
    email: zod_1.z.string().email({ message: 'Invalid email address' }),
    name: zod_1.z.string().min(1, { message: 'Name is required' }),
    designation: zod_1.z
        .string()
        .min(1, { message: 'Designation is required' })
        .max(50, { message: 'Designation must be less than 50 characters' }),
    password: zod_1.z
        .string()
        .min(6, { message: 'Password must be at least 6 characters' }),
    role: zod_1.z
        .string()
        .optional()
        .refine((val) => !val || mongoose_1.default.Types.ObjectId.isValid(val), {
        message: 'Invalid rolePermission ObjectId',
    }),
});
exports.sendAdminResetEmailValidation = zod_1.z.object({
    email: zod_1.z.string().email({ message: 'Valid email is required' }),
});
exports.verifyAdminResetEmailValidation = zod_1.z.object({
    email: zod_1.z.string().email({ message: 'Valid email is required' }),
    otpCode: zod_1.z.string().min(6, 'OTP must be 6 digits'),
    verificationId: zod_1.z.string().min(1, 'Verification ID is required'),
});
exports.resetAdminPasswordValidation = zod_1.z.object({
    email: zod_1.z.string().email({ message: 'Valid email is required' }),
    verificationId: zod_1.z.string().min(1, 'Verification ID is required'),
    newPassword: zod_1.z.string().min(8, { message: 'New password must be at least 8 characters' }),
});
