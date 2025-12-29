"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contact = void 0;
const mongoose_1 = require("mongoose");
const contactSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    whatsapp: { type: String },
    address: { type: String, required: true },
    socials: [
        {
            icon: { type: String, required: true },
            url: { type: String, required: true },
        },
    ],
});
exports.Contact = (0, mongoose_1.model)('Contact', contactSchema);
