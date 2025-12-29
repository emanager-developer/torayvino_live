"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Color = void 0;
const mongoose_1 = require("mongoose");
const colorSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    code: { type: String, required: true },
});
exports.Color = (0, mongoose_1.model)('Color', colorSchema);
