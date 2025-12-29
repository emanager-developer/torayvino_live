"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupportForm = void 0;
const mongoose_1 = require("mongoose");
const supportFormSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    subject: { type: String },
    message: { type: String, required: true },
});
exports.SupportForm = (0, mongoose_1.model)('SupportForm', supportFormSchema);
