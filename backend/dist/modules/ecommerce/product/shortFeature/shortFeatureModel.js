"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShortFeature = void 0;
const mongoose_1 = require("mongoose");
const shortFeatureSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    image: { type: String, required: true },
});
exports.ShortFeature = (0, mongoose_1.model)('ShortFeature', shortFeatureSchema);
