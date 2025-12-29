"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SEO = void 0;
const mongoose_1 = require("mongoose");
const seoSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    keywords: { type: String },
    author: { type: String },
    subject: { type: String },
    copyright: { type: String },
    ogTitle: { type: String },
    ogType: { type: String },
    ogUrl: { type: String },
    ogImageUrl: { type: String },
    ogDescription: { type: String },
    ogSiteName: { type: String },
    facebook_domain_verification: { type: String },
    google_site_verification: { type: String },
    google_tag_manager: { type: String },
});
exports.SEO = (0, mongoose_1.model)('SEO', seoSchema);
