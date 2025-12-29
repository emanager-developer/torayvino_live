"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = void 0;
const mongoose_1 = require("mongoose");
const paymentSchema = new mongoose_1.Schema({
    orderId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Order',
        required: true,
    },
    transactionId: {
        type: String,
        required: true,
        unique: true,
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    currency: {
        type: String,
        default: 'BDT',
    },
    status: {
        type: String,
        enum: ['pending', 'success', 'failed', 'cancelled'],
        default: 'pending',
    },
    gatewayResponse: {
        type: mongoose_1.Schema.Types.Mixed,
    },
    paymentDate: {
        type: Date,
    },
    refundedDate: {
        type: Date,
    },
}, { timestamps: true });
exports.Payment = (0, mongoose_1.model)('Payment', paymentSchema);
