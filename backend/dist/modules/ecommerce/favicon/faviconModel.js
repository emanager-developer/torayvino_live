"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Favicon = void 0;
const mongoose_1 = require("mongoose");
const faviconSchema = new mongoose_1.Schema({
    favicon: {
        type: String,
        required: true,
    },
});
exports.Favicon = (0, mongoose_1.model)('Favicon', faviconSchema);
