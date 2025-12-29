"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Explore = void 0;
const mongoose_1 = require("mongoose");
const exploreSchema = new mongoose_1.Schema({
    title: { type: String, required: true, unique: true },
    videoId: { type: String, required: true },
});
exports.Explore = (0, mongoose_1.model)('Explore', exploreSchema);
