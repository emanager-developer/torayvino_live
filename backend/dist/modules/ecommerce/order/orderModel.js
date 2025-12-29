"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    customer: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true,
    },
    shippingInfo: {
        address: { type: String, required: true },
        note: { type: String },
    },
    invoiceNumber: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    shippingCharge: { type: Number, required: true },
    products: [
        {
            productId: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            discount: { type: Number },
            quantity: { type: Number, required: true },
            sku: { type: String },
            price: { type: Number, required: true },
            isBundleFree: { type: Boolean, default: false },
        },
    ],
    kits: [
        {
            kitId: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'Kit',
                required: true,
            },
            discount: { type: Number },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true },
            isBundleFree: { type: Boolean, default: false },
        },
    ],
    status: {
        type: String,
        enum: ['pending', 'shipped', 'delivered', 'cancelled'],
        default: 'pending',
        required: true,
    },
    isPaid: { type: Boolean, default: false },
    paymentMethod: { type: String, required: true },
    paymentStatus: { type: String, default: 'pending' },
    transactionId: { type: String },
    tracking_code: { type: String },
    courierBy: { type: String },
    couponCode: { type: String },
    couponDiscount: { type: Number },
    couponEligibleProductIds: { type: [String], default: [] },
}, { timestamps: true });
exports.Order = (0, mongoose_1.model)('Order', orderSchema);
