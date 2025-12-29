"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEmailValidation = exports.emailValidation = void 0;
const zod_1 = require("zod");
exports.emailValidation = zod_1.z.object({
    host: zod_1.z.string().min(1, 'Host is required'),
    port: zod_1.z.number().int().positive('Port must be a positive integer'),
    user: zod_1.z.string().email('Invalid email format'),
    pass: zod_1.z.string().min(1, 'Password is required'),
});
exports.updateEmailValidation = exports.emailValidation.partial();
