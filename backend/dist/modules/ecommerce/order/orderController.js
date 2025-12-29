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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllSalesController = exports.getTodaysSalesController = exports.sendToPathaoController = exports.sendToSteadfastController = exports.exportSelectedOrdersController = exports.exportOrdersController = exports.deleteOrderController = exports.updateOrderStatusByCustomerController = exports.updateOrderStatusController = exports.getOrdersByCustomerIdController = exports.searchOrderController = exports.getOrderByIdController = exports.getAllOrdersController = exports.addOrderController = void 0;
const catchAsync_1 = require("../../../utils/catchAsync");
const orderService_1 = require("./orderService");
const orderService_2 = require("./orderService");
exports.addOrderController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, orderService_1.addOrderService)(req.body);
    res.status(200).json({
        success: true,
        message: 'order add successfully',
        data: result,
    });
}));
exports.getAllOrdersController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { meta, data } = yield (0, orderService_1.getAllOrdersService)(req.query);
    res.status(200).json({
        success: true,
        message: 'All orders retrieved successfully',
        meta,
        data,
    });
}));
exports.getOrderByIdController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield (0, orderService_1.getOrderByIdService)(id);
    res.status(200).json({
        success: true,
        message: 'Order retrieved successfully',
        data: result,
    });
}));
exports.searchOrderController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { search, phone } = req.query;
    const order = yield (0, orderService_1.searchOrderService)({ search, phone });
    if (!order) {
        return res.status(404).json({ success: false, message: 'Order not found' });
    }
    return res.status(200).json({ success: true, message: 'Order fetched successfully', data: order });
}));
exports.getOrdersByCustomerIdController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { customerId } = req.params;
    const { meta, data } = yield (0, orderService_1.getOrdersByCustomerIdService)(customerId, req.query);
    res.status(200).json({
        success: true,
        message: 'Customer orders retrieved successfully',
        meta,
        data,
    });
}));
exports.updateOrderStatusController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, orderService_1.updateOrderStatusService)(req.params.id, req.body.status);
    res.status(200).json({
        success: true,
        message: 'Order status updated successfully',
        data: result,
    });
}));
exports.updateOrderStatusByCustomerController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, orderService_1.updateOrderStatusService)(req.params.id, req.body.status);
    res.status(200).json({
        success: true,
        message: 'Order status updated successfully',
        data: result,
    });
}));
exports.deleteOrderController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, orderService_1.deleteOrderService)(req.params.id);
    res.status(200).json({
        success: true,
        message: 'Order deleted successfully',
        data: result,
    });
}));
exports.exportOrdersController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const csvBuffer = yield (0, orderService_1.exportOrdersService)({ query: req.query });
    res.setHeader('Content-Disposition', `attachment; filename="orders.csv"`);
    res.setHeader('Content-Type', 'text/csv');
    res.status(200).send(csvBuffer);
}));
exports.exportSelectedOrdersController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ids, query } = req.body || {};
    const csvBuffer = yield (0, orderService_1.exportOrdersService)({ ids, query, paginate: !!query });
    res.setHeader('Content-Disposition', `attachment; filename="orders-export.csv"`);
    res.setHeader('Content-Type', 'text/csv');
    res.status(200).send(csvBuffer);
}));
exports.sendToSteadfastController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body || [];
    const result = yield (0, orderService_2.sendToSteadfastService)(payload);
    if (!(result === null || result === void 0 ? void 0 : result.success)) {
        return res.status(500).json({ success: false, message: (result === null || result === void 0 ? void 0 : result.message) || 'Failed to send to Steadfast', data: result });
    }
    res.status(200).json({ success: true, message: result.message || 'Sent to Steadfast', data: result });
}));
exports.sendToPathaoController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = req.body || [];
    const result = yield (0, orderService_2.sendToPathaoService)(orders);
    if (!(result === null || result === void 0 ? void 0 : result.success)) {
        return res.status(500).json({ success: false, message: (result === null || result === void 0 ? void 0 : result.message) || 'Failed to send to Pathao', data: result });
    }
    res.status(200).json({ success: true, message: result.message || 'Processed Pathao orders', data: result });
}));
exports.getTodaysSalesController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { meta, totalSale, data } = yield (0, orderService_1.getTodaysSalesService)(req.query);
    res.status(200).json({
        success: true,
        message: "Today's sales retrieved successfully",
        meta,
        totalSale,
        data,
    });
}));
exports.getAllSalesController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { meta, totalSale, data } = yield (0, orderService_1.getAllSalesService)(req.query);
    res.status(200).json({
        success: true,
        message: 'All sales retrieved successfully',
        meta,
        totalSale,
        data,
    });
}));
