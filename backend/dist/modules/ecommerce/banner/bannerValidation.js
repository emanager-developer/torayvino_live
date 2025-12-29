"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBannerValidation = exports.bannerValidation = void 0;
const zod_1 = require("zod");
exports.bannerValidation = zod_1.z.object({
    order: zod_1.z.number().min(1),
    link: zod_1.z.string({ required_error: 'Link is required.' }),
});
exports.updateBannerValidation = exports.bannerValidation.partial();
