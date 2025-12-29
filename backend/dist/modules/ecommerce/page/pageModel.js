"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Page = void 0;
const mongoose_1 = require("mongoose");
const pageSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
});
exports.Page = (0, mongoose_1.model)('Page', pageSchema);
