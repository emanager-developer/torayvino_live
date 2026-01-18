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
exports.BkashService = void 0;
const axios_1 = __importDefault(require("axios"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../../../config"));
const orderModel_1 = require("../order/orderModel");
const productModel_1 = require("../product/product/productModel");
const kitModel_1 = require("../kit/kitModel");
const paymentModel_1 = require("./paymentModel");
const bkashTokenModel_1 = require("./bkashTokenModel");
const userModel_1 = require("../../user/userModel");
const customerModel_1 = require("../../customer/customerModel");
const sendEmail_1 = require("../../../utils/sendEmail");
const sendSMS_1 = require("../../../utils/sendSMS");
const shouldLogRefundDebug = () => config_1.default.NODE_ENV === 'development' ||
    String(process.env.BKASH_REFUND_DEBUG || '').toLowerCase() === 'true';
const mask = (value, visibleEnd = 6) => {
    const s = String(value !== null && value !== void 0 ? value : '');
    if (!s)
        return '';
    if (s.length <= visibleEnd)
        return s;
    return `${'*'.repeat(Math.max(0, s.length - visibleEnd))}${s.slice(-visibleEnd)}`;
};
// Get and cache bKash Token in DB (55 minutes expiry for safety)
function getBkashToken() {
    return __awaiter(this, arguments, void 0, function* (forceRefresh = false) {
        const dbToken = yield bkashTokenModel_1.BkashToken.findOne({ name: 'bkash' });
        const now = new Date();
        if (!forceRefresh &&
            dbToken &&
            dbToken.token &&
            dbToken.expiry &&
            dbToken.expiry > now) {
            return dbToken.token;
        }
        // Request new token
        const response = yield axios_1.default.post(`${config_1.default.BKASH_BASE_URL}/tokenized/checkout/token/grant`, {
            app_key: config_1.default.BKASH_APP_KEY,
            app_secret: config_1.default.BKASH_APP_SECRET,
        }, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                username: config_1.default.BKASH_USERNAME,
                password: config_1.default.BKASH_PASSWORD,
            },
        });
        if (!response.data.id_token) {
            throw new Error('Failed to get bKash token');
        }
        const token = response.data.id_token;
        // Set expiry to 55 minutes from now for safety
        const expiry = new Date(Date.now() + 55 * 60 * 1000);
        yield bkashTokenModel_1.BkashToken.findOneAndUpdate({ name: 'bkash' }, { token, expiry }, { upsert: true, new: true });
        return token;
    });
}
// Safe request wrapper (auto-refresh token on 401)
// eslint-disable-next-line no-unused-vars
function safeBkashRequest(requestFn) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const token = yield getBkashToken();
            return yield requestFn(token);
        }
        catch (err) {
            if (((_a = err.response) === null || _a === void 0 ? void 0 : _a.status) === 401) {
                // Refresh token and retry once
                const refreshedToken = yield getBkashToken(true);
                return yield requestFn(refreshedToken);
            }
            throw err;
        }
    });
}
// Helper function to update stock (same as in orderService)
function updateStock(productId, quantityOrdered, sku, session) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const product = yield productModel_1.Product.findById(productId).session(session);
        if (!product) {
            throw new Error('Product not found');
        }
        if (product.stock < quantityOrdered) {
            throw new Error('Insufficient stock available');
        }
        product.stock -= quantityOrdered;
        if (product.isVariant &&
            ((_a = product === null || product === void 0 ? void 0 : product.variants) === null || _a === void 0 ? void 0 : _a.length) &&
            product.variants.length > 0) {
            const selectedVariant = product === null || product === void 0 ? void 0 : product.variants.find((variant) => variant.sku === sku);
            if (selectedVariant) {
                if (selectedVariant.stock < quantityOrdered) {
                    throw new Error('Insufficient stock available for the variant');
                }
                selectedVariant.stock -= quantityOrdered;
                product.markModified('variants');
            }
            else {
                throw new Error('Variant not found for the specified SKU');
            }
        }
        yield product.save({ session });
    });
}
function updateKitStock(kitId, quantityOrdered, session) {
    return __awaiter(this, void 0, void 0, function* () {
        const kit = yield kitModel_1.Kit.findById(kitId).session(session);
        if (!kit) {
            throw new Error('Kit not found');
        }
        if (kit.stock && kit.stock < quantityOrdered) {
            throw new Error('Insufficient kit stock available');
        }
        if (kit.stock) {
            kit.stock -= quantityOrdered;
            yield kit.save({ session });
        }
    });
}
// Create bKash Payment (Step 1) - Initialize payment and create order
const createBkashPayment = (paymentData) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const { shippingInfo, totalPrice, shippingCharge, products, kits } = paymentData;
        // Validate stock availability before creating payment
        if (products && products.length > 0) {
            for (const product of products) {
                const { productId, quantity, sku } = product;
                const productDoc = yield productModel_1.Product.findById(productId).session(session);
                if (!productDoc) {
                    throw new Error(`Product not found: ${productId}`);
                }
                if (productDoc.stock < quantity) {
                    throw new Error(`Insufficient stock for product: ${productDoc.title}`);
                }
                if (productDoc.isVariant && productDoc.variants && productDoc.variants.length > 0) {
                    const selectedVariant = productDoc.variants.find((variant) => variant.sku === sku);
                    if (selectedVariant && selectedVariant.stock < quantity) {
                        throw new Error(`Insufficient stock for variant: ${selectedVariant.sku || 'Unknown SKU'}`);
                    }
                }
            }
        }
        // Validate kit stock availability
        if (kits && kits.length > 0) {
            for (const kit of kits) {
                const { kitId, quantity } = kit;
                const kitDoc = yield kitModel_1.Kit.findById(kitId).session(session);
                if (!kitDoc) {
                    throw new Error(`Kit not found: ${kitId}`);
                }
                if (kitDoc.stock && kitDoc.stock < quantity) {
                    throw new Error(`Insufficient kit stock: ${kitDoc.name || 'Unknown kit'}`);
                }
            }
        }
        // Generate invoice number
        const orders = yield orderModel_1.Order.find({}).session(session);
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
                invoiceNumber = "0000" + newNumber;
            }
            else if (newNumber < 100) {
                invoiceNumber = "000" + newNumber;
            }
            else if (newNumber < 1000) {
                invoiceNumber = "00" + newNumber;
            }
            else if (newNumber < 10000) {
                invoiceNumber = "0" + newNumber;
            }
            else {
                invoiceNumber = newNumber.toString();
            }
        }
        else {
            invoiceNumber = "00001";
        }
        const superAdmin = yield userModel_1.User.findOne({ role: 'superAdmin' });
        let customerId;
        const isExistCustomer = yield customerModel_1.Customer.findOne({
            phone: (_a = paymentData === null || paymentData === void 0 ? void 0 : paymentData.customer) === null || _a === void 0 ? void 0 : _a.phone,
        }).session(session);
        if (!isExistCustomer) {
            const newCustomer = yield customerModel_1.Customer.create([
                Object.assign(Object.assign({}, paymentData === null || paymentData === void 0 ? void 0 : paymentData.customer), { date: new Date(), password: (_b = paymentData === null || paymentData === void 0 ? void 0 : paymentData.customer) === null || _b === void 0 ? void 0 : _b.phone, serviceBy: superAdmin === null || superAdmin === void 0 ? void 0 : superAdmin._id, source: 'e-commerce' }),
            ], { session });
            customerId = (_c = newCustomer[0]) === null || _c === void 0 ? void 0 : _c._id;
        }
        else {
            customerId = isExistCustomer === null || isExistCustomer === void 0 ? void 0 : isExistCustomer._id;
        }
        // update coupnon usage count if applicable
        if (paymentData.couponCode) {
            const coupon = yield Promise.resolve().then(() => __importStar(require('../coupon/couponModel'))).then((mod) => mod.Coupon.findOne({ code: paymentData.couponCode }).session(session));
            if (coupon) {
                if (coupon.isUsageLimit === true) {
                    coupon.availableCount = Math.max((coupon.availableCount || 0) - 1, 0);
                    yield coupon.save({ session });
                }
            }
        }
        // Create order first (pending payment)
        const orderData = Object.assign(Object.assign(Object.assign({ customer: customerId, shippingInfo,
            invoiceNumber,
            totalPrice,
            shippingCharge }, (products && products.length > 0 && { products })), (kits && kits.length > 0 && { kits })), { status: 'pending', isPaid: false, paymentMethod: 'bkash', paymentStatus: 'pending' });
        const order = yield orderModel_1.Order.create([orderData], { session });
        const createdOrder = order[0];
        const callbackURL = `${config_1.default.BACKEND_URL}/api/payment/bkash/execute`;
        // Create bKash payment
        const bkashPaymentData = {
            mode: '0011',
            payerReference: customerId.toString(),
            amount: totalPrice,
            currency: 'BDT',
            intent: 'sale',
            merchantInvoiceNumber: invoiceNumber,
            callbackURL,
        };
        const response = yield safeBkashRequest((token) => __awaiter(void 0, void 0, void 0, function* () {
            return axios_1.default.post(`${config_1.default.BKASH_BASE_URL}/tokenized/checkout/create`, bkashPaymentData, {
                headers: {
                    'Content-Type': 'application/json',
                    authorization: token,
                    'x-app-key': config_1.default.BKASH_APP_KEY,
                },
            });
        }));
        const data = response.data;
        if (data.statusCode !== '0000') {
            yield session.abortTransaction();
            throw new Error(data.statusMessage || 'Failed to create bKash payment');
        }
        // Create payment record
        yield paymentModel_1.Payment.create([{
                orderId: createdOrder._id,
                transactionId: data.paymentID,
                paymentMethod: 'bkash',
                amount: totalPrice,
                currency: 'BDT',
                status: 'pending',
                gatewayResponse: data,
            }], { session });
        // Update order with payment ID
        yield orderModel_1.Order.findByIdAndUpdate(createdOrder._id, { transactionId: data.paymentID }, { session });
        yield session.commitTransaction();
        return {
            success: true,
            data: {
                paymentID: data.paymentID,
                bkashURL: data.bkashURL,
                orderId: createdOrder._id,
                invoiceNumber,
            },
        };
    }
    catch (error) {
        yield session.abortTransaction();
        throw error;
    }
    finally {
        yield session.endSession();
    }
});
// Execute bKash Payment (Step 2) - Handle payment callback
const executeBkashPayment = (paymentID, status) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // eslint-disable-next-line no-console
    console.log("Executing bKash payment with ID:", paymentID, "and status:", status);
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const payment = yield paymentModel_1.Payment.findOne({ transactionId: paymentID }).session(session);
        if (!payment) {
            yield session.abortTransaction();
            throw new Error('Payment not found');
        }
        // Idempotency guard: if payment already succeeded, return existing success response
        if (payment.status === 'success') {
            yield session.commitTransaction();
            return {
                success: true,
                status: 'success',
                orderId: payment.orderId,
                paymentId: payment._id,
                transactionId: payment.transactionId,
                redirectUrl: `${config_1.default.FRONTEND_URL}/payment/success/${payment.transactionId}`,
            };
        }
        const order = yield orderModel_1.Order.findById(payment.orderId).session(session);
        if (!order) {
            yield session.abortTransaction();
            throw new Error('Order not found');
        }
        // Handle different payment statuses
        if (status === 'cancel') {
            yield paymentModel_1.Payment.findByIdAndUpdate(payment._id, { status: 'cancelled' }, { session });
            yield orderModel_1.Order.findByIdAndUpdate(order._id, { paymentStatus: 'cancelled' }, { session });
            yield session.commitTransaction();
            return {
                success: false,
                status: 'cancelled',
                orderId: order._id,
                redirectUrl: `${config_1.default.FRONTEND_URL}/payment/cancel`,
            };
        }
        if (status === 'failure' || status === 'fail') {
            yield paymentModel_1.Payment.findByIdAndUpdate(payment._id, { status: 'failed' }, { session });
            yield orderModel_1.Order.findByIdAndUpdate(order._id, { paymentStatus: 'failed' }, { session });
            yield session.commitTransaction();
            return {
                success: false,
                status: 'failed',
                orderId: order._id,
                redirectUrl: `${config_1.default.FRONTEND_URL}/payment/failure`,
            };
        }
        if (status === 'success') {
            // Execute the payment with bKash
            const executeData = { paymentID };
            const response = yield safeBkashRequest((token) => __awaiter(void 0, void 0, void 0, function* () {
                return axios_1.default.post(`${config_1.default.BKASH_BASE_URL}/tokenized/checkout/execute`, executeData, {
                    headers: {
                        Accept: 'application/json',
                        authorization: token,
                        'x-app-key': config_1.default.BKASH_APP_KEY,
                    },
                });
            }));
            const data = response.data;
            // eslint-disable-next-line no-console
            console.log("bKash execute response data:", JSON.stringify(data, null, 2));
            // eslint-disable-next-line no-console
            console.log("Status code received:", data.statusCode, "Type:", typeof data.statusCode);
            // bKash success status codes: '0000' for success, sometimes 'Completed' or other variations
            const isSuccess = data.statusCode === '0000' ||
                data.transactionStatus === 'Completed' ||
                data.transactionStatus === 'completed' ||
                (data.statusCode && data.statusCode.toString().toLowerCase() === 'completed');
            // eslint-disable-next-line no-console
            console.log("Is success:", isSuccess, "Transaction status:", data.transactionStatus);
            if (isSuccess) {
                // eslint-disable-next-line no-console
                console.log("Payment is successful, updating payment and order status...");
                // Update payment status
                yield paymentModel_1.Payment.findByIdAndUpdate(payment._id, {
                    status: 'success',
                    paymentDate: new Date(),
                    gatewayResponse: data,
                    transactionId: data.trxID || paymentID,
                }, { session });
                // eslint-disable-next-line no-console
                console.log("Payment status updated to success");
                // Update order status
                yield orderModel_1.Order.findByIdAndUpdate(order._id, {
                    isPaid: true,
                    status: 'pending', // Order is paid but still pending for processing
                    transactionId: data.trxID || paymentID,
                    paymentStatus: 'success',
                }, { session });
                // eslint-disable-next-line no-console
                console.log("Order status updated to paid");
                // Update stock for products (handle insufficient stock gracefully)
                if (order.products && order.products.length > 0) {
                    for (const product of order.products) {
                        const { productId, quantity, sku } = product;
                        try {
                            yield updateStock(productId, quantity, sku, session);
                        }
                        catch (stockError) {
                            // eslint-disable-next-line no-console
                            console.log(`Stock update failed for product ${productId}:`, stockError.message);
                            // Continue with payment success even if stock update fails
                            // You might want to create a notification for admin about low stock
                        }
                    }
                }
                // Update stock for kits (handle insufficient stock gracefully)
                if (order.kits && order.kits.length > 0) {
                    for (const kit of order.kits) {
                        const { kitId, quantity } = kit;
                        try {
                            yield updateKitStock(kitId, quantity, session);
                        }
                        catch (stockError) {
                            // eslint-disable-next-line no-console
                            console.log(`Stock update failed for kit ${kitId}:`, stockError.message);
                            // Continue with payment success even if stock update fails
                        }
                    }
                }
                yield session.commitTransaction();
                // eslint-disable-next-line no-console
                console.log("Transaction committed successfully, returning success response");
                // eslint-disable-next-line no-console
                console.log("Redirect URL:", `${config_1.default.FRONTEND_URL}/payment/success/${data.trxID}`);
                // Send SMS and email notifications after successful payment
                try {
                    const populatedOrder = yield orderModel_1.Order.findById(order._id).populate('customer');
                    const customer = populatedOrder === null || populatedOrder === void 0 ? void 0 : populatedOrder.customer;
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
                        // Check if customer was newly created
                        const customerDoc = yield customerModel_1.Customer.findById(customer === null || customer === void 0 ? void 0 : customer._id);
                        const isNewCustomer = customerDoc && customerDoc.password === customerDoc.phone;
                        let message = `Thank you for your order with TorayvinoBD.\nInvoice: ${order.invoiceNumber}.\nTotal: ${order.totalPrice || ''}.\nPayment: Successful (bKash)`;
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
                    const populatedOrder = yield orderModel_1.Order.findById(order._id).populate('customer');
                    const customer = populatedOrder === null || populatedOrder === void 0 ? void 0 : populatedOrder.customer;
                    const emailData = {
                        customerName: (customer === null || customer === void 0 ? void 0 : customer.name) || 'Customer',
                        customerPhone: (customer === null || customer === void 0 ? void 0 : customer.phone) || '',
                        customerEmail: (customer === null || customer === void 0 ? void 0 : customer.email) || '',
                        address: ((_a = order.shippingInfo) === null || _a === void 0 ? void 0 : _a.address) || '',
                        invoiceNumber: order.invoiceNumber,
                        totalPrice: order.totalPrice,
                        paymentMethod: 'bKash',
                        createdAt: new Date(),
                    };
                    yield (0, sendEmail_1.notificationForNewOrder)(emailData);
                }
                catch (emailError) {
                    // eslint-disable-next-line no-console
                    console.error('Failed to send payment confirmation email:', emailError);
                }
                return {
                    success: true,
                    status: 'success',
                    orderId: order._id,
                    paymentId: payment._id,
                    transactionId: data.trxID,
                    redirectUrl: `${config_1.default.FRONTEND_URL}/payment/success/${data.trxID}`,
                };
            }
            else {
                // Payment execution failed
                // Only mark as failed if it isn't already successful (protect against races)
                yield paymentModel_1.Payment.findOneAndUpdate({ _id: payment._id, status: { $ne: 'success' } }, { status: 'failed' }, { session });
                yield orderModel_1.Order.findOneAndUpdate({ _id: order._id, paymentStatus: { $ne: 'success' } }, { paymentStatus: 'failed' }, { session });
                yield session.commitTransaction();
                return {
                    success: false,
                    status: 'failed',
                    orderId: order._id,
                    message: data.statusMessage,
                    redirectUrl: `${config_1.default.FRONTEND_URL}/payment/error?message=${encodeURIComponent(data.statusMessage || 'Payment failed')}&orderId=${order._id}`,
                };
            }
        }
        yield session.commitTransaction();
        throw new Error('Invalid payment status');
    }
    catch (error) {
        // eslint-disable-next-line no-console
        console.log("ERROR in executeBkashPayment:", error);
        yield session.abortTransaction();
        // Update payment status to failed in case of error
        try {
            // Avoid overwriting a successful status in case of concurrent callbacks
            yield paymentModel_1.Payment.findOneAndUpdate({ transactionId: paymentID, status: { $ne: 'success' } }, { status: 'failed' });
            const failedPayment = yield paymentModel_1.Payment.findOne({ transactionId: paymentID });
            if (failedPayment) {
                yield orderModel_1.Order.findOneAndUpdate({ _id: failedPayment.orderId, paymentStatus: { $ne: 'success' } }, { paymentStatus: 'failed' });
            }
            // eslint-disable-next-line no-console
            console.log("Updated payment status to failed due to error");
        }
        catch (_b) {
            // Error updating payment status - silently fail
        }
        throw error;
    }
    finally {
        yield session.endSession();
    }
});
// Refund bKash Payment
const refundBkashPayment = (paymentID, trxID, amount, reason, sku) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    const refundData = {
        paymentID,
        trxID,
        amount,
        reason,
        sku,
    };
    const start = Date.now();
    const refundUrl = `${config_1.default.BKASH_BASE_URL}/tokenized/checkout/payment/refund`;
    if (shouldLogRefundDebug()) {
        // eslint-disable-next-line no-console
        console.log('[bkash-refund] start', {
            url: refundUrl,
            trxID: mask(trxID),
            paymentID: mask(paymentID),
            amount,
            sku,
        });
    }
    try {
        const { data } = yield safeBkashRequest((token) => __awaiter(void 0, void 0, void 0, function* () {
            return axios_1.default.post(`${config_1.default.BKASH_BASE_URL}/tokenized/checkout/payment/refund`, refundData, {
                headers: {
                    Accept: 'application/json',
                    authorization: token,
                    'x-app-key': config_1.default.BKASH_APP_KEY,
                },
                timeout: Number(process.env.BKASH_HTTP_TIMEOUT_MS || 20000),
            });
        }));
        if (shouldLogRefundDebug()) {
            // eslint-disable-next-line no-console
            console.log('[bkash-refund] response', {
                ms: Date.now() - start,
                trxID: mask(trxID),
                statusCode: data === null || data === void 0 ? void 0 : data.statusCode,
                transactionStatus: data === null || data === void 0 ? void 0 : data.transactionStatus,
                statusMessage: data === null || data === void 0 ? void 0 : data.statusMessage,
            });
        }
        const statusCode = (_c = (_b = (_a = data === null || data === void 0 ? void 0 : data.statusCode) === null || _a === void 0 ? void 0 : _a.toString) === null || _b === void 0 ? void 0 : _b.call(_a)) !== null && _c !== void 0 ? _c : '';
        const transactionStatus = ((_d = data === null || data === void 0 ? void 0 : data.transactionStatus) !== null && _d !== void 0 ? _d : '').toString();
        const normalizedTxn = transactionStatus.toLowerCase();
        const statusMessage = (data === null || data === void 0 ? void 0 : data.statusMessage) || (data === null || data === void 0 ? void 0 : data.message) || '';
        const isCompleted = statusCode === '0000' && (normalizedTxn === 'completed' || normalizedTxn === 'success');
        const isInitiated = statusCode === '0000' && !isCompleted;
        // Always store refund response for audit/debug
        const payment = yield paymentModel_1.Payment.findOne({ transactionId: trxID });
        const mergedGatewayResponse = Object.assign(Object.assign({}, ((payment === null || payment === void 0 ? void 0 : payment.gatewayResponse) || {})), { refund: data });
        if (isCompleted) {
            const updated = yield paymentModel_1.Payment.findOneAndUpdate({ transactionId: trxID, status: { $ne: 'refunded' } }, {
                status: 'refunded',
                refundedDate: new Date(),
                gatewayResponse: mergedGatewayResponse,
            }, { new: true });
            if (updated) {
                yield orderModel_1.Order.findByIdAndUpdate(updated.orderId, {
                    paymentStatus: 'refunded',
                });
            }
            return {
                success: true,
                message: 'Refund completed successfully',
                data,
            };
        }
        if (isInitiated) {
            const updated = yield paymentModel_1.Payment.findOneAndUpdate({ transactionId: trxID, status: { $nin: ['refunded'] } }, {
                status: 'refund_initiated',
                gatewayResponse: mergedGatewayResponse,
            }, { new: true });
            if (updated) {
                yield orderModel_1.Order.findByIdAndUpdate(updated.orderId, {
                    paymentStatus: 'refund_initiated',
                });
            }
            return {
                success: true,
                message: 'Refund initiated',
                data,
            };
        }
        // Failed (or unexpected response)
        const failReason = statusMessage || 'Refund failed';
        yield paymentModel_1.Payment.findOneAndUpdate({ transactionId: trxID, status: { $nin: ['refunded'] } }, {
            status: 'refund_failed',
            gatewayResponse: mergedGatewayResponse,
        }, { new: true });
        return {
            success: false,
            message: failReason,
            data,
        };
    }
    catch (err) {
        const gatewayData = (_e = err === null || err === void 0 ? void 0 : err.response) === null || _e === void 0 ? void 0 : _e.data;
        const isTimeout = (err === null || err === void 0 ? void 0 : err.code) === 'ETIMEDOUT' ||
            (err === null || err === void 0 ? void 0 : err.code) === 'ECONNABORTED' ||
            String((err === null || err === void 0 ? void 0 : err.message) || '').toLowerCase().includes('timeout');
        const failReason = (gatewayData === null || gatewayData === void 0 ? void 0 : gatewayData.statusMessage) ||
            (gatewayData === null || gatewayData === void 0 ? void 0 : gatewayData.message) ||
            (isTimeout
                ? 'bKash gateway timeout (ETIMEDOUT). Please retry.'
                : (err === null || err === void 0 ? void 0 : err.message) || 'Refund request failed');
        if (shouldLogRefundDebug()) {
            // eslint-disable-next-line no-console
            console.error('[bkash-refund] error', {
                ms: Date.now() - start,
                url: refundUrl,
                trxID: mask(trxID),
                paymentID: mask(paymentID),
                code: err === null || err === void 0 ? void 0 : err.code,
                errno: err === null || err === void 0 ? void 0 : err.errno,
                syscall: err === null || err === void 0 ? void 0 : err.syscall,
                address: err === null || err === void 0 ? void 0 : err.address,
                port: err === null || err === void 0 ? void 0 : err.port,
                httpStatus: (_f = err === null || err === void 0 ? void 0 : err.response) === null || _f === void 0 ? void 0 : _f.status,
                gatewayStatusCode: gatewayData === null || gatewayData === void 0 ? void 0 : gatewayData.statusCode,
                gatewayStatusMessage: (gatewayData === null || gatewayData === void 0 ? void 0 : gatewayData.statusMessage) || (gatewayData === null || gatewayData === void 0 ? void 0 : gatewayData.message),
            });
        }
        // Store error for audit; keep refundable by allowing retry (refund_failed)
        try {
            const payment = yield paymentModel_1.Payment.findOne({ transactionId: trxID });
            const mergedGatewayResponse = Object.assign(Object.assign({}, ((payment === null || payment === void 0 ? void 0 : payment.gatewayResponse) || {})), { refundError: gatewayData || { message: failReason } });
            yield paymentModel_1.Payment.findOneAndUpdate({ transactionId: trxID, status: { $nin: ['refunded'] } }, { status: 'refund_failed', gatewayResponse: mergedGatewayResponse }, { new: true });
        }
        catch (_g) {
            // ignore secondary update errors
        }
        return {
            success: false,
            message: failReason,
            data: gatewayData,
        };
    }
});
exports.BkashService = {
    createBkashPayment,
    executeBkashPayment,
    refundBkashPayment,
};
