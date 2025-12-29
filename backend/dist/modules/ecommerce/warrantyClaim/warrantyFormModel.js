"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WarrantyForm = void 0;
const mongoose_1 = require("mongoose");
const warrantyFormSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    device: { type: String, required: true },
    problemDescription: { type: String, required: true },
    address: { type: String, required: true },
    purchaseDate: { type: Date, required: true },
    invoiceNumber: { type: String, required: true },
    purchasePlace: { type: String, required: true },
    images: { type: [String], default: [] },
    status: { type: String, required: true, default: 'pending' },
    serviceMethod: { type: String, required: true },
    problemCategory: { type: String },
    notes: { type: String, default: '' },
});
exports.WarrantyForm = (0, mongoose_1.model)('WarrantyForm', warrantyFormSchema);
