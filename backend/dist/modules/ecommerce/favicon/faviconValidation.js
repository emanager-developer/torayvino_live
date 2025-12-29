"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.faviconValidation = void 0;
const zod_1 = require("zod");
exports.faviconValidation = zod_1.z.object({
    favicon: zod_1.z.string({ required_error: 'Favicon is required.' }),
});
