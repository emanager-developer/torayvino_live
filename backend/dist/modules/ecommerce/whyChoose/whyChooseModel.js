"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhyChoose = void 0;
const mongoose_1 = require("mongoose");
const whyChooseSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    points: [
        {
            title: { type: String, required: true },
            description: { type: String, required: true },
            image: { type: String },
        },
    ],
});
exports.WhyChoose = (0, mongoose_1.model)('WhyChoose', whyChooseSchema);
