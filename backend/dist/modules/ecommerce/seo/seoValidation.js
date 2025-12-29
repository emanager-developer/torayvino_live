"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSeoValidation = exports.seoValidation = void 0;
const zod_1 = require("zod");
exports.seoValidation = zod_1.z.object({
    title: zod_1.z.string().min(1),
    author: zod_1.z.string().optional(),
    subject: zod_1.z.string().optional(),
    description: zod_1.z.string().min(3).max(200),
    keywords: zod_1.z.string().optional(),
    ogTitle: zod_1.z.string().optional(),
    ogType: zod_1.z.string().optional(),
    ogUrl: zod_1.z.string().optional(),
    ogImageUrl: zod_1.z.string().optional(),
    ogDescription: zod_1.z.string().optional(),
    ogSiteName: zod_1.z.string().optional(),
    facebook_domain_verification: zod_1.z.string().optional(),
    google_site_verification: zod_1.z.string().optional(),
    google_tag_manager: zod_1.z.string().optional(),
});
exports.updateSeoValidation = exports.seoValidation.partial();
