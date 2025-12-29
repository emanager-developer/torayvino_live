"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const otpRateLimitSchema = new mongoose_1.Schema({
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    requestCount: {
        type: Number,
        default: 0,
    },
    lastRequestAt: {
        type: Date,
        default: Date.now,
    },
    blockedUntil: {
        type: Date,
    },
    hourlyCount: {
        type: Number,
        default: 0,
    },
    hourlyResetTime: {
        type: Date,
        default: () => new Date(Date.now() + 60 * 60 * 1000), // 1 hour from now
    },
}, {
    timestamps: true,
});
// Index for cleanup and rate limiting queries
otpRateLimitSchema.index({ phoneNumber: 1, blockedUntil: 1 });
// TTL Index - MongoDB will delete rate limit records after hourly reset time + 1 hour buffer
otpRateLimitSchema.index({ hourlyResetTime: 1 }, { expireAfterSeconds: 3600 }); // 1 hour after hourly reset
const OTPRateLimit = (0, mongoose_1.model)("OTPRateLimit", otpRateLimitSchema);
exports.default = OTPRateLimit;
