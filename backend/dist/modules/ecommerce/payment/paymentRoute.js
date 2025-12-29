"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRoutes = void 0;
const express_1 = require("express");
const paymentController_1 = require("./paymentController");
const paymentValidation_1 = require("./paymentValidation");
const verifyValidate_1 = __importDefault(require("../../../middlewares/verifyValidate"));
const verifyPermission_1 = require("../../../middlewares/verifyPermission");
const router = (0, express_1.Router)();
// Payment initialization
router.post('/init', (0, verifyValidate_1.default)(paymentValidation_1.PaymentValidation.initPaymentValidation), paymentController_1.PaymentController.initPayment);
// Payment success callback
router.post('/payment-success', paymentController_1.PaymentController.paymentSuccess);
// Payment failure callback
router.post('/payment-fail', paymentController_1.PaymentController.paymentFailed);
// bKash execute payment callback
router.get('/bkash/execute', paymentController_1.PaymentController.executeBkashPayment);
// IPN endpoint
router.post('/ipn', paymentController_1.PaymentController.handleIPN);
// Get payment by transaction ID
router.get('/transaction/:transactionId', paymentController_1.PaymentController.getPaymentByTransactionId);
// Get successful payments (with order info) - supports query params for pagination/filter
router.get('/successful-payments', paymentController_1.PaymentController.getSuccessfulPaymentsController);
// Refund bKash payment
router.post('/bkash/refund', (0, verifyPermission_1.verifyPermission)('payment', 'update'), (0, verifyValidate_1.default)(paymentValidation_1.PaymentValidation.refundBkashPaymentValidation), paymentController_1.PaymentController.refundBkashPayment);
exports.PaymentRoutes = router;
