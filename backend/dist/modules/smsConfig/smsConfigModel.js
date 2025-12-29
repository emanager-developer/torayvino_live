"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SMSConfig = void 0;
const mongoose_1 = require("mongoose");
const smsConfigSchema = new mongoose_1.Schema({
    apiUrl: {
        type: String,
        required: true,
    },
    apiKey: {
        type: String,
        required: true,
    },
    apiSecret: {
        type: String,
    },
    senderId: {
        type: String,
        required: true,
    },
});
exports.SMSConfig = (0, mongoose_1.model)('SMSConfig', smsConfigSchema);
