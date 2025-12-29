"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoValidation = void 0;
const zod_1 = require("zod");
exports.logoValidation = zod_1.z.object({
    logo: zod_1.z.string({ required_error: 'Logo is required.' }),
});
