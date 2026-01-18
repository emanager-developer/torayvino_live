"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const axios_1 = __importDefault(require("axios"));
const crypto_1 = require("crypto");
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../../../config"));
const orderModel_1 = require("../order/orderModel");
const productModel_1 = require("../product/product/productModel");
const kitModel_1 = require("../kit/kitModel");
const paymentModel_1 = require("./paymentModel");
const bkashService_1 = require("./bkashService");
const customerModel_1 = require("../../customer/customerModel");
const userModel_1 = require("../../user/userModel");
const QueryBuilder_1 = __importDefault(require("../../../builders/QueryBuilder"));
const sendSMS_1 = require("../../../utils/sendSMS");
const sendEmail_1 = require("../../../utils/sendEmail");
const initPayment = (paymentData) => __awaiter(void 0, void 0, void 0, function* () {
    const { paymentMethod } = paymentData;
    // Route to appropriate payment service based on payment method
    if (paymentMethod === 'bkash') {
        return yield bkashService_1.BkashService.createBkashPayment(paymentData);
    }
    // Default to SSLCommerz for other payment methods (ssl, card, etc.)
    return yield initSSLPayment(paymentData);
});
const initSSLPayment = (paymentData) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    const { customer, shippingInfo, totalPrice, shippingCharge, products, kits, paymentMethod, currency = 'BDT', } = paymentData;
    // Generate RFC 4122 v4 UUID without relying on ESM-only 'uuid' package
    const transactionId = (0, crypto_1.randomUUID)();
    // Prepare SSLCommerz data
    const sslData = {
        store_id: config_1.default.SSL_STORE_ID,
        store_passwd: config_1.default.SSL_STORE_PASSWORD,
        total_amount: totalPrice,
        currency: currency,
        tran_id: transactionId,
        success_url: `${config_1.default.BACKEND_URL}/api/payment/payment-success?transactionId=${transactionId}`,
        fail_url: `${config_1.default.BACKEND_URL}/api/payment/payment-fail?transactionId=${transactionId}`,
        cancel_url: `${config_1.default.BACKEND_URL}/api/payment/payment-fail?transactionId=${transactionId}`,
        ipn_url: `${config_1.default.BACKEND_URL}/api/payment/ipn`,
        shipping_method: 'Courier',
        product_name: 'E-commerce Products',
        product_category: 'General',
        product_profile: 'general',
        cus_name: customer.name || 'Customer',
        cus_email: customer.email || 'customer@example.com',
        cus_add1: shippingInfo.address,
        cus_add2: shippingInfo.note || '',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: customer.phone || '01700000000',
        cus_fax: '',
        ship_name: customer.name || 'Customer',
        ship_add1: shippingInfo.address,
        ship_add2: shippingInfo.note || '',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
    };
    // SSLCommerz expects application/x-www-form-urlencoded payload
    const form = new URLSearchParams();
    for (const [key, value] of Object.entries(sslData)) {
        if (value === undefined || value === null)
            continue;
        form.append(key, String(value));
    }
    const response = yield axios_1.default.post(config_1.default.SSL_PAYMENT_URL, form.toString(), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    if (((_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.status) !== 'SUCCESS') {
        throw new Error(((_b = response === null || response === void 0 ? void 0 : response.data) === null || _b === void 0 ? void 0 : _b.failedreason) || 'Payment initialization failed');
    }
    // Generate invoice number
    const orders = yield orderModel_1.Order.find({});
    let invoiceNumber;
    if ((orders === null || orders === void 0 ? void 0 : orders.length) > 0) {
        const invoiceNumbers = orders
            .map((order) => {
            const num = parseInt((order === null || order === void 0 ? void 0 : order.invoiceNumber) || '0');
            return isNaN(num) ? 0 : num;
        })
            .filter((num) => num > 0);
        const maxInvoiceNumber = invoiceNumbers.length > 0 ? Math.max(...invoiceNumbers) : 0;
        const newNumber = maxInvoiceNumber + 1;
        if (newNumber < 10) {
            invoiceNumber = '0000' + newNumber;
        }
        else if (newNumber < 100) {
            invoiceNumber = '000' + newNumber;
        }
        else if (newNumber < 1000) {
            invoiceNumber = '00' + newNumber;
        }
        else if (newNumber < 10000) {
            invoiceNumber = '0' + newNumber;
        }
        else {
            invoiceNumber = newNumber.toString();
        }
    }
    else {
        invoiceNumber = '00001';
    }
    const superAdmin = yield userModel_1.User.findOne({ role: 'superAdmin' });
    let customerId;
    const isExistCustomer = yield customerModel_1.Customer.findOne({
        phone: (_c = paymentData === null || paymentData === void 0 ? void 0 : paymentData.customer) === null || _c === void 0 ? void 0 : _c.phone,
    });
    if (!isExistCustomer) {
        const newCustomer = yield customerModel_1.Customer.create([
            Object.assign(Object.assign({}, paymentData === null || paymentData === void 0 ? void 0 : paymentData.customer), { date: new Date(), password: (_d = paymentData === null || paymentData === void 0 ? void 0 : paymentData.customer) === null || _d === void 0 ? void 0 : _d.phone, serviceBy: superAdmin === null || superAdmin === void 0 ? void 0 : superAdmin._id, source: 'e-commerce' }),
        ]);
        customerId = (_e = newCustomer[0]) === null || _e === void 0 ? void 0 : _e._id;
    }
    else {
        customerId = isExistCustomer === null || isExistCustomer === void 0 ? void 0 : isExistCustomer._id;
    }
    // Update coupon usage count if applicable
    if (paymentData.couponCode) {
        const coupon = yield Promise.resolve().then(() => __importStar(require('../coupon/couponModel'))).then((mod) => mod.Coupon.findOne({ code: paymentData.couponCode }));
        if (coupon) {
            if (coupon.isUsageLimit === true) {
                coupon.availableCount = Math.max((coupon.availableCount || 0) - 1, 0);
                yield coupon.save();
            }
        }
    }
    // Create order
    const orderData = Object.assign(Object.assign(Object.assign({ customer: customerId, shippingInfo,
        invoiceNumber,
        totalPrice,
        shippingCharge }, (products && products.length > 0 && { products })), (kits && kits.length > 0 && { kits })), { status: 'pending', isPaid: false, paymentStatus: 'pending', paymentMethod,
        transactionId });
    const order = yield orderModel_1.Order.create(orderData);
    // Create payment record
    yield paymentModel_1.Payment.create({
        orderId: order._id,
        transactionId,
        paymentMethod,
        amount: totalPrice,
        currency,
        status: 'pending',
        gatewayResponse: response.data,
    });
    return {
        paymentUrl: response.data.GatewayPageURL,
        transactionId,
        orderId: order._id,
    };
});
const paymentSuccess = (transactionId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const order = yield orderModel_1.Order.findOne({ transactionId }).populate('customer');
    if (!order) {
        throw new Error('Order not found');
    }
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // Idempotency: if already paid, do nothing
        if (order.isPaid === true) {
            yield session.commitTransaction();
            yield session.endSession();
            return order;
        }
        // Update order as paid
        const updatedOrder = yield orderModel_1.Order.findOneAndUpdate({ transactionId }, {
            $set: {
                isPaid: true,
                status: 'pending', // Order is paid but still pending for processing
                paymentStatus: 'success',
            },
        }, { new: true, session }).populate('customer');
        // Update payment status (avoid overwriting if already marked success by a concurrent callback)
        yield paymentModel_1.Payment.findOneAndUpdate({ transactionId, status: { $ne: 'success' } }, {
            $set: {
                status: 'success',
                paymentDate: new Date(),
            },
        }, { new: true, session });
        // Update product stock
        if (order.products && order.products.length > 0) {
            for (const orderProduct of order.products) {
                const { productId, quantity, sku } = orderProduct;
                const product = yield productModel_1.Product.findById(productId).session(session);
                if (!product) {
                    continue;
                }
                if (product.isVariant && sku && product.variants) {
                    // Handle variant products
                    const variantIndex = product.variants.findIndex((variant) => variant.sku === sku);
                    if (variantIndex !== -1) {
                        const updatedStock = product.variants[variantIndex].stock - quantity;
                        yield productModel_1.Product.findByIdAndUpdate(productId, {
                            $set: {
                                [`variants.${variantIndex}.stock`]: Math.max(0, updatedStock),
                            },
                        }, { new: true, session });
                    }
                }
                else {
                    // Handle regular products
                    const updatedStock = product.stock - quantity;
                    yield productModel_1.Product.findByIdAndUpdate(productId, {
                        $set: {
                            stock: Math.max(0, updatedStock),
                        },
                    }, { new: true, session });
                }
            }
        }
        // Update kit stock
        if (order.kits && order.kits.length > 0) {
            for (const orderKit of order.kits) {
                const { kitId, quantity } = orderKit;
                const kit = yield kitModel_1.Kit.findById(kitId).session(session);
                if (!kit) {
                    continue;
                }
                // Update kit stock
                if (kit.stock !== undefined) {
                    const updatedStock = kit.stock - quantity;
                    yield kitModel_1.Kit.findByIdAndUpdate(kitId, {
                        $set: {
                            stock: Math.max(0, updatedStock),
                        },
                    }, { new: true, session });
                }
            }
        }
        yield session.commitTransaction();
        yield session.endSession();
        // Send SMS and email notifications after successful payment
        try {
            const customer = updatedOrder === null || updatedOrder === void 0 ? void 0 : updatedOrder.customer;
            const rawPhone = (customer === null || customer === void 0 ? void 0 : customer.phone) || '';
            const normalizeBDPhone = (phone) => {
                const p = String(phone || '').replace(/\D/g, '');
                if (p.startsWith('880'))
                    return p;
                if (p.startsWith('0'))
                    return '88' + p;
                if (p.startsWith('1'))
                    return '880' + p;
                return p;
            };
            const customerPhone = normalizeBDPhone(rawPhone);
            if (customerPhone) {
                // Check if customer was newly created (basic heuristic)
                const customerDoc = yield customerModel_1.Customer.findById(customer === null || customer === void 0 ? void 0 : customer._id);
                const isNewCustomer = customerDoc && customerDoc.password === customerDoc.phone;
                let message = `Thank you for your order with TorayvinoBD.\nInvoice: ${updatedOrder === null || updatedOrder === void 0 ? void 0 : updatedOrder.invoiceNumber}.\nTotal: ${(updatedOrder === null || updatedOrder === void 0 ? void 0 : updatedOrder.totalPrice) || ''}.\nPayment: Successful`;
                if (isNewCustomer) {
                    message += `\n\nYour login information:\nUser ID: ${rawPhone}\nPassword: ${rawPhone}`;
                }
                message += `\n\nVisit: ${process.env.FRONTEND_URL}`;
                const smsResult = yield (0, sendSMS_1.sendSMS)(customerPhone, message);
                // eslint-disable-next-line no-console
                console.log('payment-success-sms:', smsResult);
            }
        }
        catch (smsError) {
            // eslint-disable-next-line no-console
            console.error('Failed to send payment confirmation SMS:', smsError);
        }
        // Send email to admin
        try {
            const customer = updatedOrder === null || updatedOrder === void 0 ? void 0 : updatedOrder.customer;
            const emailData = {
                customerName: (customer === null || customer === void 0 ? void 0 : customer.name) || 'Customer',
                customerPhone: (customer === null || customer === void 0 ? void 0 : customer.phone) || '',
                customerEmail: (customer === null || customer === void 0 ? void 0 : customer.email) || '',
                address: ((_a = updatedOrder === null || updatedOrder === void 0 ? void 0 : updatedOrder.shippingInfo) === null || _a === void 0 ? void 0 : _a.address) || '',
                invoiceNumber: (updatedOrder === null || updatedOrder === void 0 ? void 0 : updatedOrder.invoiceNumber) || '',
                totalPrice: (updatedOrder === null || updatedOrder === void 0 ? void 0 : updatedOrder.totalPrice) || 0,
                paymentMethod: 'SSL Commerz',
                createdAt: new Date(),
            };
            yield (0, sendEmail_1.notificationForNewOrder)(emailData);
        }
        catch (emailError) {
            // eslint-disable-next-line no-console
            console.error('Failed to send payment confirmation email:', emailError);
        }
        return order;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
});
const paymentFailed = (transactionId) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const order = yield orderModel_1.Order.findOne({ transactionId }).session(session);
        // If already paid, do not mark failed/delete
        if ((order === null || order === void 0 ? void 0 : order.isPaid) === true || (order === null || order === void 0 ? void 0 : order.paymentStatus) === 'success') {
            yield session.commitTransaction();
            yield session.endSession();
            return { message: 'Payment already successful; ignoring failure callback' };
        }
        // Update payment status to failed (do not overwrite success)
        yield paymentModel_1.Payment.findOneAndUpdate({ transactionId, status: { $ne: 'success' } }, {
            $set: {
                status: 'failed',
            },
        }, { new: true, session });
        // Update order payment status before deleting
        yield orderModel_1.Order.findOneAndUpdate({ transactionId, paymentStatus: { $ne: 'success' } }, {
            $set: {
                paymentStatus: 'failed',
            },
        }, { session });
        // Delete the order as payment failed
        yield orderModel_1.Order.findOneAndDelete({ transactionId }, { session });
        yield session.commitTransaction();
        yield session.endSession();
        return { message: 'Payment failed and order cancelled' };
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
});
const getPaymentByTransactionId = (transactionId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield paymentModel_1.Payment.findOne({ transactionId }).populate('orderId');
});
const getSuccessfulPayments = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const PaymentQuery = new QueryBuilder_1.default(paymentModel_1.Payment.find({
        status: { $in: ['success', 'refunded', 'refund_initiated', 'refund_failed'] },
    }).populate('orderId'), query)
        .search(['transactionId', 'paymentMethod'])
        .filter()
        .sort()
        .paginate()
        .fields();
    const meta = yield PaymentQuery.countTotal();
    const data = yield PaymentQuery.modelQuery;
    return {
        meta,
        data,
    };
});
exports.PaymentService = {
    initPayment,
    paymentSuccess,
    paymentFailed,
    getPaymentByTransactionId,
    getSuccessfulPayments,
};
