"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComplainForm = void 0;
const mongoose_1 = require("mongoose");
const complainFormSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    device: { type: String, required: true },
    problemDescription: { type: String, required: true },
});
exports.ComplainForm = (0, mongoose_1.model)('ComplainForm', complainFormSchema);
