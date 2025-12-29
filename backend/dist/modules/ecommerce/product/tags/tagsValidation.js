"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTagsValidation = exports.tagsValidation = void 0;
const zod_1 = require("zod");
exports.tagsValidation = zod_1.z.object({
    name: zod_1.z.string().min(2).max(100),
});
exports.updateTagsValidation = exports.tagsValidation.partial();
