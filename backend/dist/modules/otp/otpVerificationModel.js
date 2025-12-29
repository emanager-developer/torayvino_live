"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const otpVerificationSchema = new mongoose_1.Schema({
    verificationId: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    phoneNumber: {
        type: String,
        // phoneNumber is optional now because we also support email-based verifications
        required: false,
        index: true,
    },
    email: {
        type: String,
        required: false,
        index: true,
    },
    otpCodeHash: {
        type: String,
        required: true,
    },
    attempts: {
        type: Number,
        default: 0,
        max: 3,
    },
    maxAttempts: {
        type: Number,
        default: 3,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isExpired: {
        type: Boolean,
        default: false,
    },
    expiresAt: {
        type: Date,
        required: true,
        index: true,
        default: () => new Date(Date.now() + 5 * 60 * 1000),
    },
    verifiedAt: {
        type: Date,
    },
    ipAddress: {
        type: String,
    },
    userAgent: {
        type: String,
    },
}, {
    timestamps: true,
});
// TTL Index - MongoDB will automatically delete expired documents
// Documents will be deleted shortly after their expiresAt time
otpVerificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 60 }); // 1 minute grace period
// Indexes for phone/email and creation time
otpVerificationSchema.index({ phoneNumber: 1, createdAt: -1 });
otpVerificationSchema.index({ email: 1, createdAt: -1 });
// No pre-save hook required because `expiresAt` has a default value
const OTPVerification = (0, mongoose_1.model)("OTPVerification", otpVerificationSchema);
exports.default = OTPVerification;
