"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCampaignBannerValidation = exports.campaignBannerValidation = void 0;
const zod_1 = require("zod");
exports.campaignBannerValidation = zod_1.z.object({
    order: zod_1.z.number().min(1),
    link: zod_1.z.string({ required_error: 'Link is required.' }),
});
exports.updateCampaignBannerValidation = exports.campaignBannerValidation.partial();
