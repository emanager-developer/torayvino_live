"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.manualCleanup = exports.initializeScheduledJobs = void 0;
const otpService_1 = require("../modules/otp/otpService");
/**
 * Initialize scheduled jobs for OTP cleanup
 */
const initializeScheduledJobs = () => {
    // console.log('🧹 Initializing OTP cleanup scheduler...');
    // Clean up expired OTPs and rate limits every 1h
    const cleanupInterval = setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield otpService_1.OTPService.cleanupExpiredRecords();
            if (result.total > 0) {
                // eslint-disable-next-line no-console
                console.log(`🧹 Scheduled cleanup completed: ${result.otpRecords} OTP records, ${result.rateLimitRecords} rate limit records deleted`);
            }
        }
        catch (error) {
            // eslint-disable-next-line no-console
            console.error('❌ Scheduled cleanup failed:', error);
        }
    }), 1 * 60 * 60 * 1000); // 1 hour in milliseconds
    // Cleanup on process termination
    const cleanup = () => {
        clearInterval(cleanupInterval);
        // console.log('🧹 Cleanup scheduler stopped');
    };
    process.on('SIGINT', cleanup);
    process.on('SIGTERM', cleanup);
    // For production, you may want to use node-cron instead:
    // import cron from "node-cron";
    // cron.schedule('*/30 * * * *', cleanupFunction); // Every 30 minutes
};
exports.initializeScheduledJobs = initializeScheduledJobs;
/**
 * Manual cleanup function (can be called from API endpoint)
 */
const manualCleanup = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield otpService_1.OTPService.cleanupExpiredRecords();
});
exports.manualCleanup = manualCleanup;
