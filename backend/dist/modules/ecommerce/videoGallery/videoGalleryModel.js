"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoGallery = void 0;
const mongoose_1 = require("mongoose");
const videoGallerySchema = new mongoose_1.Schema({
    videoId: { type: String, required: true },
});
exports.VideoGallery = (0, mongoose_1.model)('VideoGallery', videoGallerySchema);
