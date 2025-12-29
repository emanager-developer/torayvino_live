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
exports.exportSelectedWarrantyClaimController = exports.exportWarrantyClaimController = exports.addNotesToWarrantyFormController = exports.updateWarrantyFormStatusController = exports.deleteWarrantyFormController = exports.updateWarrantyFormController = exports.getSingleWarrantyFormController = exports.getWarrantyFormsByCustomerPhoneController = exports.getAllWarrantyFormController = exports.addWarrantyFormController = void 0;
const catchAsync_1 = require("../../../utils/catchAsync");
const deleteFile_1 = require("../../../utils/deleteFile");
const warrantyFormService_1 = require("./warrantyFormService");
exports.addWarrantyFormController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const files = req.files;
    const images = (files === null || files === void 0 ? void 0 : files.images) ? files.images.map((f) => f.filename) : [];
    const payload = Object.assign({}, req.body);
    // Attach image paths
    if (images.length > 0) {
        payload.images = images.map((image) => `/warranty/${image}`);
    }
    const result = yield (0, warrantyFormService_1.addWarrantyFormService)(payload);
    if (!result) {
        // Rollback file upload
        if (images.length > 0) {
            images.forEach((image) => (0, deleteFile_1.deleteFile)(`./uploads/warranty/${image}`));
        }
        throw new Error('Failed to add warranty form');
    }
    res.status(200).json({
        success: true,
        message: 'Warranty Form added successfully',
        data: result,
    });
}));
exports.getAllWarrantyFormController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, warrantyFormService_1.getAllWarrantyFormService)();
    res.status(200).json({
        success: true,
        message: 'Warranty Form get successfully',
        data: result,
    });
}));
exports.getWarrantyFormsByCustomerPhoneController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { phone } = req.params;
    const result = yield (0, warrantyFormService_1.getWarrantyFormsByCustomerPhone)(phone);
    res.status(200).json({
        success: true,
        message: 'Warranty Form get successfully',
        data: result,
    });
}));
exports.getSingleWarrantyFormController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield (0, warrantyFormService_1.getSingleWarrantyFormService)(id);
    res.status(200).json({
        success: true,
        message: 'Warranty Form get successfully',
        data: result,
    });
}));
exports.updateWarrantyFormController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield (0, warrantyFormService_1.updateWarrantyFormService)(id, req.body);
    res.status(200).json({
        success: true,
        message: 'Warranty Form update successfully',
        data: result,
    });
}));
exports.deleteWarrantyFormController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield (0, warrantyFormService_1.deleteWarrantyFormService)(id);
    res.status(200).json({
        success: true,
        message: 'Warranty Form delete successfully',
    });
}));
exports.updateWarrantyFormStatusController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield (0, warrantyFormService_1.updateWarrantyFormStatusService)(id, req.body.status);
    res.status(200).json({
        success: true,
        message: 'Warranty Form status updated successfully',
        data: result,
    });
}));
exports.addNotesToWarrantyFormController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const notes = req.body.notes;
    // eslint-disable-next-line no-console
    console.log(notes);
    const result = yield (0, warrantyFormService_1.updateNoteWarrantyFormService)(id, notes);
    res.status(200).json({
        success: true,
        message: 'Notes added to Warranty Form successfully',
        data: result,
    });
}));
exports.exportWarrantyClaimController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const csvBuffer = yield (0, warrantyFormService_1.exportWarrantyClaimService)({ query: req.query });
    res.setHeader('Content-Disposition', `attachment; filename="orders.csv"`);
    res.setHeader('Content-Type', 'text/csv');
    res.status(200).send(csvBuffer);
}));
exports.exportSelectedWarrantyClaimController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ids, query } = req.body || {};
    const csvBuffer = yield (0, warrantyFormService_1.exportWarrantyClaimService)({ ids, query, paginate: !!query });
    res.setHeader('Content-Disposition', `attachment; filename="orders-export.csv"`);
    res.setHeader('Content-Type', 'text/csv');
    res.status(200).send(csvBuffer);
}));
