"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateInvoiceNumber = void 0;
const generateInvoiceNumber = () => {
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `INV-${date}-${random}`;
};
exports.generateInvoiceNumber = generateInvoiceNumber;
