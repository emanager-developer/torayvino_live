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
exports.deleteServiceConfigController = exports.updateServiceConfigController = exports.getSingleServiceConfigController = exports.getAllServiceConfigController = exports.addServiceConfigController = void 0;
const catchAsync_1 = require("../../../utils/catchAsync");
const serviceConfigService_1 = require("./serviceConfigService");
exports.addServiceConfigController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, serviceConfigService_1.addServiceConfigService)(req.body);
    res.status(200).json({
        success: true,
        message: 'ServiceConfig add successfully',
        data: result,
    });
}));
exports.getAllServiceConfigController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, serviceConfigService_1.getAllServiceConfigService)();
    res.status(200).json({
        success: true,
        message: 'ServiceConfigs get successfully',
        data: result,
    });
}));
exports.getSingleServiceConfigController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield (0, serviceConfigService_1.getSingleServiceConfigService)(id);
    res.status(200).json({
        success: true,
        message: 'ServiceConfig get successfully',
        data: result,
    });
}));
exports.updateServiceConfigController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield (0, serviceConfigService_1.updateServiceConfigService)(id, req.body);
    res.status(200).json({
        success: true,
        message: 'ServiceConfig update successfully',
        data: result,
    });
}));
exports.deleteServiceConfigController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield (0, serviceConfigService_1.deleteServiceConfigService)(id);
    res.status(200).json({
        success: true,
        message: 'ServiceConfig delete successfully',
    });
}));
