"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.settingValidation = void 0;
const zod_1 = require("zod");
exports.settingValidation = zod_1.z.object({
    name: zod_1.z.string().min(1, { message: 'Name is required' }),
    email: zod_1.z.string().email({ message: 'Invalid email address' }),
    phone: zod_1.z.string().min(1, { message: 'Phone number is required' }),
    address: zod_1.z.string().min(1, { message: 'Address is required' }),
});
