"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateVideoGalleryValidation = exports.videoGalleryValidation = void 0;
const zod_1 = require("zod");
exports.videoGalleryValidation = zod_1.z.object({
    videoId: zod_1.z.string().min(1, 'Video ID is required'),
});
exports.updateVideoGalleryValidation = exports.videoGalleryValidation.partial();
