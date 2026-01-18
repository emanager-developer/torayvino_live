"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentValidation = void 0;
const zod_1 = require("zod");
const initPaymentValidation = zod_1.z.object({
    shippingInfo: zod_1.z.object({
        address: zod_1.z.string({
            required_error: 'Shipping address is required',
        }),
        note: zod_1.z.string().optional(),
    }),
    totalPrice: zod_1.z
        .number({
        required_error: 'Total price is required',
    })
        .min(1, 'Total price must be greater than 0'),
    shippingCharge: zod_1.z
        .number({
        required_error: 'Shipping charge is required',
    })
        .min(0, 'Shipping charge cannot be negative'),
    products: zod_1.z
        .array(zod_1.z.object({
        productId: zod_1.z.string({
            required_error: 'Product ID is required',
        }),
        discount: zod_1.z.number().optional(),
        quantity: zod_1.z
            .number({
            required_error: 'Quantity is required',
        })
            .min(1, 'Quantity must be at least 1'),
        sku: zod_1.z.string().optional(),
        price: zod_1.z
            .number({
            required_error: 'Price is required',
        })
            .min(0, 'Price cannot be negative'),
    }))
        .optional(),
    kits: zod_1.z
        .array(zod_1.z.object({
        kitId: zod_1.z.string({
            required_error: 'Kit ID is required',
        }),
        discount: zod_1.z.number().optional(),
        quantity: zod_1.z
            .number({
            required_error: 'Quantity is required',
        })
            .min(1, 'Quantity must be at least 1'),
        price: zod_1.z
            .number({
            required_error: 'Price is required',
        })
            .min(0, 'Price cannot be negative'),
    }))
        .optional(),
    paymentMethod: zod_1.z.string({
        required_error: 'Payment method is required',
    }),
    currency: zod_1.z.string().optional(),
});
const refundBkashPaymentValidation = zod_1.z
    .object({
    paymentObjectId: zod_1.z.string().optional(),
    orderId: zod_1.z.string().optional(),
    paymentID: zod_1.z.string().optional(),
    trxID: zod_1.z.string().optional(),
    amount: zod_1.z
        .number({
        required_error: 'Refund amount is required',
    })
        .min(1, 'Refund amount must be greater than 0'),
    reason: zod_1.z.string({
        required_error: 'Refund reason is required',
    }),
    sku: zod_1.z.string().optional(),
})
    .refine((data) => !!data.paymentObjectId || (!!data.paymentID && !!data.trxID), {
    message: 'Provide paymentObjectId OR both paymentID and trxID',
    path: ['paymentID'],
});
exports.PaymentValidation = {
    initPaymentValidation,
    refundBkashPaymentValidation,
};
