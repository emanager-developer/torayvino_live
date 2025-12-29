"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignBanner = void 0;
const mongoose_1 = require("mongoose");
const campaignBannerSchema = new mongoose_1.Schema({
    order: { type: Number, required: true },
    link: { type: String, required: true },
    image: { type: String, required: true },
});
exports.CampaignBanner = (0, mongoose_1.model)('CampaignBanner', campaignBannerSchema);
