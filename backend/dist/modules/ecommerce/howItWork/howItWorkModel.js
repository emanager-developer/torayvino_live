"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HowItWork = void 0;
const mongoose_1 = require("mongoose");
const howItWorkSchema = new mongoose_1.Schema({
    order: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
});
exports.HowItWork = (0, mongoose_1.model)('HowItWork', howItWorkSchema);
