"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOfferBannerValidation = exports.offerBannerValidation = void 0;
const zod_1 = require("zod");
exports.offerBannerValidation = zod_1.z.object({
    order: zod_1.z.number().min(1),
    link: zod_1.z.string({ required_error: 'Link is required.' }),
});
exports.updateOfferBannerValidation = exports.offerBannerValidation.partial();
