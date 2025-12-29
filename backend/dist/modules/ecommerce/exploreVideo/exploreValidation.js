"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateExploreValidation = exports.exploreValidation = void 0;
const zod_1 = require("zod");
exports.exploreValidation = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Title is required'),
    videoId: zod_1.z.string().min(1, 'Video ID is required'),
});
exports.updateExploreValidation = exports.exploreValidation.partial();
