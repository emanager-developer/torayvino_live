"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkVerificationStatusValidation = exports.resendOTPValidation = exports.verifyOTPValidation = exports.sendOTPValidation = void 0;
const zod_1 = require("zod");
const phoneNumberRegex = /^(\+880|880|0)?1[3-9]\d{8}$/;
exports.sendOTPValidation = zod_1.z.object({
    phoneNumber: zod_1.z
        .string()
        .min(1, "Phone number is required")
        .regex(phoneNumberRegex, "Please enter a valid Bangladeshi phone number")
        .transform((phone) => {
        // Normalize phone number to +880 format
        if (phone.startsWith("0")) {
            return "+880" + phone.slice(1);
        }
        else if (phone.startsWith("880")) {
            return "+" + phone;
        }
        else if (!phone.startsWith("+880")) {
            return "+880" + phone;
        }
        return phone;
    }),
});
exports.verifyOTPValidation = zod_1.z.object({
    phoneNumber: zod_1.z
        .string()
        .min(1, "Phone number is required")
        .regex(phoneNumberRegex, "Please enter a valid Bangladeshi phone number")
        .transform((phone) => {
        // Normalize phone number to +880 format
        if (phone.startsWith("0")) {
            return "+880" + phone.slice(1);
        }
        else if (phone.startsWith("880")) {
            return "+" + phone;
        }
        else if (!phone.startsWith("+880")) {
            return "+880" + phone;
        }
        return phone;
    }),
    otpCode: zod_1.z
        .string()
        .length(6, "OTP must be 6 digits")
        .regex(/^\d{6}$/, "OTP must contain only digits"),
    verificationId: zod_1.z
        .string()
        .min(1, "Verification ID is required"),
});
exports.resendOTPValidation = zod_1.z.object({
    verificationId: zod_1.z
        .string()
        .min(1, "Verification ID is required"),
});
// For the status route, we need a different validation approach since it uses params
exports.checkVerificationStatusValidation = zod_1.z.object({
    verificationId: zod_1.z
        .string()
        .min(1, "Verification ID is required"),
});
