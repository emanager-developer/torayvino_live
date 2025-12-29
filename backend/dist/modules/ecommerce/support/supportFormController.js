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
exports.deleteSupportFormController = exports.updateSupportFormController = exports.getSingleSupportFormController = exports.getSupportsByCustomerPhoneController = exports.getAllSupportFormController = exports.addSupportFormController = void 0;
const catchAsync_1 = require("../../../utils/catchAsync");
const supportFormService_1 = require("./supportFormService");
exports.addSupportFormController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, supportFormService_1.addSupportFormService)(req.body);
    res.status(200).json({
        success: true,
        message: 'Support Form add successfully',
        data: result,
    });
}));
exports.getAllSupportFormController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, supportFormService_1.getAllSupportFormService)();
    res.status(200).json({
        success: true,
        message: 'Support Form get successfully',
        data: result,
    });
}));
exports.getSupportsByCustomerPhoneController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { phone } = req.params;
    const result = yield (0, supportFormService_1.getSupportsByCustomerPhone)(phone);
    res.status(200).json({
        success: true,
        message: 'Support Form get successfully',
        data: result,
    });
}));
exports.getSingleSupportFormController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield (0, supportFormService_1.getSingleSupportFormService)(id);
    res.status(200).json({
        success: true,
        message: 'Support Form get successfully',
        data: result,
    });
}));
exports.updateSupportFormController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield (0, supportFormService_1.updateSupportFormService)(id, req.body);
    res.status(200).json({
        success: true,
        message: 'Support Form update successfully',
        data: result,
    });
}));
exports.deleteSupportFormController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield (0, supportFormService_1.deleteSupportFormService)(id);
    res.status(200).json({
        success: true,
        message: 'Support Form delete successfully',
    });
}));
