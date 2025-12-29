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
exports.updateSMSConfigController = exports.getSMSConfigController = exports.createSMSConfigController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const smsConfigService_1 = require("./smsConfigService");
exports.createSMSConfigController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, smsConfigService_1.createSMSConfigService)(req.body);
    res.status(200).json({
        success: true,
        message: 'SMSConfig add successfully',
        data: result,
    });
}));
exports.getSMSConfigController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, smsConfigService_1.getSMSConfigService)();
    res.status(200).json({
        success: true,
        message: 'SMSConfig get successfully',
        data: result,
    });
}));
exports.updateSMSConfigController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, smsConfigService_1.updateSMSConfigService)(req.params.id, req.body);
    res.status(200).json({
        success: true,
        message: 'SMSConfig update successfully',
        data: result,
    });
}));
