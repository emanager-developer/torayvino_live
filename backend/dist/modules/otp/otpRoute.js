"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OTPRoutes = void 0;
const express_1 = require("express");
const otpController_1 = require("./otpController");
const verifyValidate_1 = __importDefault(require("../../middlewares/verifyValidate"));
const otpValidation_1 = require("./otpValidation");
const router = (0, express_1.Router)();
// Send OTP
router.post("/send-otp", (0, verifyValidate_1.default)(otpValidation_1.sendOTPValidation), otpController_1.OTPController.sendOTP);
// Verify OTP
router.post("/verify-otp", (0, verifyValidate_1.default)(otpValidation_1.verifyOTPValidation), otpController_1.OTPController.verifyOTP);
// Resend OTP
router.post("/resend-otp", (0, verifyValidate_1.default)(otpValidation_1.resendOTPValidation), otpController_1.OTPController.resendOTP);
// Check verification status (no validation needed for params)
router.get("/verification-status/:verificationId", otpController_1.OTPController.checkVerificationStatus);
// Admin endpoint for cleanup (you may want to add auth middleware here)
router.delete("/cleanup-expired", 
// Add admin authentication middleware here
otpController_1.OTPController.cleanupExpiredOTPs);
exports.OTPRoutes = router;
