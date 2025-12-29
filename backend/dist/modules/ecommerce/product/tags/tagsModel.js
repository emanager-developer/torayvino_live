"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tags = void 0;
const mongoose_1 = require("mongoose");
const tagsSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
});
exports.Tags = (0, mongoose_1.model)('Tags', tagsSchema);
