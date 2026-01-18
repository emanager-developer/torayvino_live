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
const paymentModel_1 = require("./paymentModel");
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
    var _a, _b, _c;
    const transactionIdFromQuery = (_a = req.query) === null || _a === void 0 ? void 0 : _a.transactionId;
    const transactionIdFromBody = (((_b = req.body) === null || _b === void 0 ? void 0 : _b.tran_id) || ((_c = req.body) === null || _c === void 0 ? void 0 : _c.transactionId));
    const transactionId = (typeof transactionIdFromQuery === 'string' && transactionIdFromQuery) ||
        transactionIdFromBody;
    // success callback received
    if (!transactionId) {
        return res.redirect(`${process.env.FRONTEND_URL}/payment/failed/invalid-transaction?message=${encodeURIComponent('Missing transactionId')}`);
    }
    try {
        yield paymentService_1.PaymentService.paymentSuccess(transactionId);
        res.redirect(`${process.env.FRONTEND_URL}/payment/success/${transactionId}`);
    }
    catch (_d) {
        res.redirect(`${process.env.FRONTEND_URL}/payment/failed/${transactionId}?message=${encodeURIComponent('Payment verification failed')}`);
    }
}));
const paymentFailed = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    const transactionIdFromQuery = (_a = req.query) === null || _a === void 0 ? void 0 : _a.transactionId;
    const transactionIdFromBody = (((_b = req.body) === null || _b === void 0 ? void 0 : _b.tran_id) || ((_c = req.body) === null || _c === void 0 ? void 0 : _c.transactionId));
    const transactionId = (typeof transactionIdFromQuery === 'string' && transactionIdFromQuery) ||
        transactionIdFromBody;
    const failedReason = (typeof ((_d = req.body) === null || _d === void 0 ? void 0 : _d.failedreason) === 'string' && req.body.failedreason) ||
        (typeof ((_e = req.body) === null || _e === void 0 ? void 0 : _e.error) === 'string' && req.body.error) ||
        (typeof ((_f = req.body) === null || _f === void 0 ? void 0 : _f.status) === 'string' && req.body.status) ||
        'Payment failed';
    // failure callback received
    if (!transactionId) {
        return res.redirect(`${process.env.FRONTEND_URL}/payment/failed/invalid-transaction?message=${encodeURIComponent(failedReason)}`);
    }
    try {
        yield paymentService_1.PaymentService.paymentFailed(transactionId);
    }
    catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error handling payment failure:', error);
    }
    res.redirect(`${process.env.FRONTEND_URL}/payment/failed/${transactionId}?message=${encodeURIComponent(failedReason)}`);
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
    var _a, _b;
    const { paymentObjectId, paymentID, trxID, amount, reason, sku } = req.body;
    // Resolve identifiers (frontend may not have paymentID reliably)
    let resolvedPaymentId = paymentID;
    let resolvedTrxId = trxID;
    if (paymentObjectId) {
        const paymentDoc = yield paymentModel_1.Payment.findById(paymentObjectId);
        if (!paymentDoc) {
            return res.status(200).json({
                success: false,
                message: 'Payment not found',
            });
        }
        resolvedTrxId = resolvedTrxId || paymentDoc.transactionId;
        const gw = (paymentDoc.gatewayResponse || {});
        resolvedPaymentId =
            resolvedPaymentId ||
                (gw === null || gw === void 0 ? void 0 : gw.paymentID) ||
                (gw === null || gw === void 0 ? void 0 : gw.paymentId) ||
                (gw === null || gw === void 0 ? void 0 : gw.payment_id) ||
                ((_a = gw === null || gw === void 0 ? void 0 : gw.refund) === null || _a === void 0 ? void 0 : _a.paymentID) ||
                ((_b = gw === null || gw === void 0 ? void 0 : gw.refund) === null || _b === void 0 ? void 0 : _b.paymentId);
        if (paymentDoc.status === 'refunded') {
            return res.status(200).json({
                success: true,
                message: 'Already refunded',
                data: {
                    transactionStatus: 'Completed',
                },
            });
        }
        if (paymentDoc.paymentMethod !== 'bkash') {
            return res.status(200).json({
                success: false,
                message: 'Refunds are only supported for bKash payments',
            });
        }
        if (paymentDoc.status !== 'success' && paymentDoc.status !== 'refund_failed') {
            return res.status(200).json({
                success: false,
                message: `Refund not allowed for status: ${paymentDoc.status}`,
            });
        }
    }
    if (!resolvedPaymentId || !resolvedTrxId) {
        return res.status(200).json({
            success: false,
            message: 'Missing paymentID or trxID for refund',
        });
    }
    const result = yield bkashService_1.BkashService.refundBkashPayment(resolvedPaymentId, resolvedTrxId, amount, reason, sku);
    return res.status(200).json(result);
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
