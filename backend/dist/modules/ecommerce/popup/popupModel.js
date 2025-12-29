"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Popup = void 0;
const mongoose_1 = require("mongoose");
const popupSchema = new mongoose_1.Schema({
    image: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        default: '',
    },
    description: {
        type: String,
        default: '',
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});
exports.Popup = (0, mongoose_1.model)('Popup', popupSchema);
