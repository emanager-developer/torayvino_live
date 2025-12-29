"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSMSConfigValidation = exports.smsConfigValidation = void 0;
const zod_1 = require("zod");
exports.smsConfigValidation = zod_1.z.object({
    apiUrl: zod_1.z.string().url().nonempty('API URL is required'),
    apiKey: zod_1.z.string().nonempty('API Key is required'),
    apiSecret: zod_1.z.string().optional(),
    senderId: zod_1.z.string().nonempty('Sender ID is required'),
});
exports.updateSMSConfigValidation = exports.smsConfigValidation.partial();
