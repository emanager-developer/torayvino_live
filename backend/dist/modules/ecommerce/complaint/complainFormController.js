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
exports.deleteComplaintFormController = exports.updateComplaintFormController = exports.getSingleComplaintFormController = exports.getComplaintsByCustomerPhoneController = exports.getAllComplaintFormController = exports.addComplaintFormController = void 0;
const catchAsync_1 = require("../../../utils/catchAsync");
const complainFormService_1 = require("./complainFormService");
exports.addComplaintFormController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, complainFormService_1.addComplaintFormService)(req.body);
    res.status(200).json({
        success: true,
        message: 'Complaint Form add successfully',
        data: result,
    });
}));
exports.getAllComplaintFormController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, complainFormService_1.getAllComplaintFormService)();
    res.status(200).json({
        success: true,
        message: 'Complaint Form get successfully',
        data: result,
    });
}));
exports.getComplaintsByCustomerPhoneController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { phone } = req.params;
    const result = yield (0, complainFormService_1.getComplaintsByCustomerPhone)(phone);
    res.status(200).json({
        success: true,
        message: 'Complaint Form get successfully',
        data: result,
    });
}));
exports.getSingleComplaintFormController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield (0, complainFormService_1.getSingleComplaintFormService)(id);
    res.status(200).json({
        success: true,
        message: 'Complaint Form get successfully',
        data: result,
    });
}));
exports.updateComplaintFormController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield (0, complainFormService_1.updateComplaintFormService)(id, req.body);
    res.status(200).json({
        success: true,
        message: 'Complaint Form update successfully',
        data: result,
    });
}));
exports.deleteComplaintFormController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield (0, complainFormService_1.deleteComplaintFormService)(id);
    res.status(200).json({
        success: true,
        message: 'Complaint Form delete successfully',
    });
}));
