"use strict";
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
exports.PaymentController = void 0;
const catchAsync_1 = require("../../../utils/catchAsync");
const paymentService_1 = require("./paymentService");
const bkashService_1 = require("./bkashService");
const http_status_1 = __importDefault(require("http-status"));
const sendResponse_1 = __importDefault(require("../../../utils/sendResponse"));
const initPayment = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Validate that at least one of products or kits is provided
    const { products, kits } = req.body;
    const hasProducts = products && products.length > 0;
    const hasKits = kits && kits.length > 0;
    if (!hasProducts && !hasKits) {
        res.status(400).json({
            success: false,
            message: 'At least one product or kit is required',
            statusCode: 400,
        });
        return;
    }
    const result = yield paymentService_1.PaymentService.initPayment(req.body);
    res.status(200).json({
        success: true,
        message: 'Payment initialization successful',
        data: result,
    });
}));
const paymentSuccess = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { transactionId } = req.query;
    if (!transactionId || typeof transactionId !== 'string') {
        return res.redirect(`${process.env.FRONTEND_URL}/payment/failed/invalid-transaction`);
    }
    try {
        yield paymentService_1.PaymentService.paymentSuccess(transactionId);
        res.redirect(`${process.env.FRONTEND_URL}/payment/success/${transactionId}`);
    }
    catch (_a) {
        res.redirect(`${process.env.FRONTEND_URL}/payment/failed/${transactionId}`);
    }
}));
const paymentFailed = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { transactionId } = req.query;
    if (!transactionId || typeof transactionId !== 'string') {
        return res.redirect(`${process.env.FRONTEND_URL}/payment/failed/invalid-transaction`);
    }
    try {
        yield paymentService_1.PaymentService.paymentFailed(transactionId);
    }
    catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error handling payment failure:', error);
    }
    res.redirect(`${process.env.FRONTEND_URL}/payment/failed/${transactionId}`);
}));
const getPaymentByTransactionId = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { transactionId } = req.params;
    const result = yield paymentService_1.PaymentService.getPaymentByTransactionId(transactionId);
    res.status(200).json({
        success: true,
        message: 'Payment retrieved successfully',
        data: result,
    });
}));
// bKash Execute Payment Controller
const executeBkashPayment = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { paymentID, status } = req.query;
    if (!paymentID || typeof paymentID !== 'string') {
        return res.redirect(`${process.env.FRONTEND_URL}/payment/error?message=Invalid payment ID`);
    }
    if (!status || typeof status !== 'string') {
        return res.redirect(`${process.env.FRONTEND_URL}/payment/error?message=Invalid payment status`);
    }
    try {
        const result = yield bkashService_1.BkashService.executeBkashPayment(paymentID, status);
        // eslint-disable-next-line no-console
        console.log("Controller received result:", JSON.stringify(result, null, 2));
        if (result.success) {
            // eslint-disable-next-line no-console
            console.log("Redirecting to SUCCESS URL:", result.redirectUrl);
            res.redirect(result.redirectUrl);
        }
        else {
            // eslint-disable-next-line no-console
            console.log("Redirecting to FAILURE URL:", result.redirectUrl);
            res.redirect(result.redirectUrl);
        }
    }
    catch (error) {
        // eslint-disable-next-line no-console
        console.log("Controller CATCH block - error:", error);
        res.redirect(`${process.env.FRONTEND_URL}/payment/error?message=Payment execution failed`);
    }
}));
// IPN (Instant Payment Notification) handler - Optional for SSLCommerz
const handleIPN = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Log IPN data for debugging
    // eslint-disable-next-line no-console
    console.log('IPN received:', req.body);
    // You can add additional verification logic here if needed
    res.status(200).send('OK');
}));
const getSuccessfulPaymentsController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield paymentService_1.PaymentService.getSuccessfulPayments(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Successful payments retrieved successfully',
        meta: result.meta,
        data: result.data,
    });
}));
const refundBkashPayment = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { paymentID, trxID, amount, reason, sku } = req.body;
    const result = yield bkashService_1.BkashService.refundBkashPayment(paymentID, trxID, amount, reason, sku);
    res.status(200).json({
        success: true,
        message: 'Bkash payment refunded successfully',
        data: result,
    });
}));
exports.PaymentController = {
    initPayment,
    paymentSuccess,
    paymentFailed,
    getPaymentByTransactionId,
    executeBkashPayment,
    handleIPN,
    getSuccessfulPaymentsController,
    refundBkashPayment,
};
