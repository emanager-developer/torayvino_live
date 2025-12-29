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
exports.deleteShippingConfigController = exports.updateShippingConfigController = exports.getSingleShippingConfigController = exports.getAllShippingConfigController = exports.addShippingConfigController = void 0;
const catchAsync_1 = require("../../../utils/catchAsync");
const shippingConfigService_1 = require("./shippingConfigService");
exports.addShippingConfigController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, shippingConfigService_1.addShippingConfigService)(req.body);
    res.status(200).json({
        success: true,
        message: 'ShippingConfig add successfully',
        data: result,
    });
}));
exports.getAllShippingConfigController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, shippingConfigService_1.getAllShippingConfigService)();
    res.status(200).json({
        success: true,
        message: 'ShippingConfigs get successfully',
        data: result,
    });
}));
exports.getSingleShippingConfigController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield (0, shippingConfigService_1.getSingleShippingConfigService)(id);
    res.status(200).json({
        success: true,
        message: 'ShippingConfig get successfully',
        data: result,
    });
}));
exports.updateShippingConfigController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield (0, shippingConfigService_1.updateShippingConfigService)(id, req.body);
    res.status(200).json({
        success: true,
        message: 'ShippingConfig update successfully',
        data: result,
    });
}));
exports.deleteShippingConfigController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield (0, shippingConfigService_1.deleteShippingConfigService)(id);
    res.status(200).json({
        success: true,
        message: 'ShippingConfig delete successfully',
    });
}));
