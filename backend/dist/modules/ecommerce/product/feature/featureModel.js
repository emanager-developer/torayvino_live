"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Feature = void 0;
const mongoose_1 = require("mongoose");
const featureSchema = new mongoose_1.Schema({
    order: { type: Number, required: true },
    name: { type: String, required: true },
    description: { type: String },
    slug: { type: String, required: true, unique: true },
    image: { type: String, required: true },
});
exports.Feature = (0, mongoose_1.model)('Feature', featureSchema);
