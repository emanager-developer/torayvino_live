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
exports.bulkBackLeadController = exports.bulkSoftDeleteLeadController = exports.backLeadController = exports.updateLeadStatusController = exports.getTargetedLeadEmailController = exports.getTargetedLeadController = exports.bulkLeadController = exports.deleteLeadController = exports.updateLeadController = exports.getByIdLeadController = exports.getAllLeadController = exports.addLeadController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const leadService_1 = require("./leadService");
const xlsx_1 = __importDefault(require("xlsx"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = require("mongoose");
const deleteFile_1 = require("../../utils/deleteFile");
const leadModel_1 = require("./leadModel");
exports.addLeadController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, leadService_1.addLeadService)(req.body);
    res.status(200).json({
        success: true,
        message: 'Lead add successfully',
        data: result,
    });
}));
exports.getAllLeadController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { meta, data } = yield (0, leadService_1.getAllLeadService)(req.query);
    res.status(200).json({
        success: true,
        message: 'Leads get successfully',
        meta,
        data,
    });
}));
exports.getByIdLeadController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, leadService_1.getByIdLeadService)(req.params.id);
    res.status(200).json({
        success: true,
        message: 'Lead get successfully',
        data: result,
    });
}));
exports.updateLeadController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, leadService_1.updateLeadService)(req.params.id, req.body);
    res.status(200).json({
        success: true,
        message: 'Lead update successfully',
        data: result,
    });
}));
exports.deleteLeadController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, leadService_1.deleteLeadService)(req.params.id, req.body.user);
    res.status(200).json({
        success: true,
        message: 'Lead delete successfully',
    });
}));
function parseFlexibleDate(input) {
    if (input instanceof Date)
        return input;
    if (typeof input === 'number') {
        const excelEpoch = new Date(Date.UTC(1899, 11, 30));
        return new Date(excelEpoch.getTime() + input * 24 * 60 * 60 * 1000);
    }
    if (typeof input === 'string') {
        // Replace comma with dash
        const cleaned = input.trim().replace(/[,/]/g, '-').replace(/\s+/g, '-');
        // Try parsing with Date
        const parsed = new Date(cleaned);
        if (!isNaN(parsed.getTime())) {
            return parsed;
        }
    }
    // fallback
    return new Date();
}
exports.bulkLeadController = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req === null || req === void 0 ? void 0 : req.file;
    if (!file)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'file is required !');
    const { addedBy } = req.body;
    try {
        const workbook = xlsx_1.default.readFile(file === null || file === void 0 ? void 0 : file.path);
        const sheetName = workbook.SheetNames[0];
        const sheetData = xlsx_1.default.utils.sheet_to_json(workbook.Sheets[sheetName]);
        const leads = sheetData.map((item) => ({
            date: parseFlexibleDate(item === null || item === void 0 ? void 0 : item.date),
            name: (item === null || item === void 0 ? void 0 : item.name) || 'unknown',
            email: (item === null || item === void 0 ? void 0 : item.email) || undefined,
            phone: (item === null || item === void 0 ? void 0 : item.phone) || '00000000000',
            company: (item === null || item === void 0 ? void 0 : item.company) || undefined,
            address: (item === null || item === void 0 ? void 0 : item.address) || undefined,
            purpose: (item === null || item === void 0 ? void 0 : item.purpose) || 'Digital Marketing',
            source: (item === null || item === void 0 ? void 0 : item.source) || 'Referral',
            link: (item === null || item === void 0 ? void 0 : item.link) || undefined,
            conversation: [
                {
                    date: Date.now(),
                    message: item === null || item === void 0 ? void 0 : item.conversation,
                },
            ],
            status: (item === null || item === void 0 ? void 0 : item.status) || 'new',
            serviceBy: new mongoose_1.Types.ObjectId((item === null || item === void 0 ? void 0 : item.serviceBy) || addedBy),
            addedBy: new mongoose_1.Types.ObjectId(addedBy),
            updatedBy: undefined,
            deletedBy: undefined,
            isDeleted: false,
        }));
        const uniqueLeads = leads.filter((lead, index, self) => index === self.findIndex((l) => l.phone === lead.phone));
        const existingLeads = yield leadModel_1.Lead.find().select('phone');
        const allExistingLeads = existingLeads.map((lead) => lead.phone);
        const newLeads = uniqueLeads.filter((lead) => !allExistingLeads.includes(String(lead.phone)));
        const result = yield (0, leadService_1.bulkLeadService)(newLeads);
        res.status(200).json({
            success: true,
            message: 'Leads imported successfully',
            data: result,
        });
        if (result && file)
            (0, deleteFile_1.deleteFile)(`/lead/${file === null || file === void 0 ? void 0 : file.filename}`);
    }
    catch (error) {
        if (file)
            (0, deleteFile_1.deleteFile)(`/lead/${file === null || file === void 0 ? void 0 : file.filename}`);
        next(error);
    }
}));
exports.getTargetedLeadController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, leadService_1.getTargetedLeadService)(req.query.ids, req.query.purpose);
    res.status(200).json({
        success: true,
        message: 'Leads get successfully',
        data: result,
    });
}));
exports.getTargetedLeadEmailController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, leadService_1.getTargetedLeadEmailService)(req.query.ids, req.query.purpose);
    res.status(200).json({
        success: true,
        message: 'Leads get successfully',
        data: result,
    });
}));
exports.updateLeadStatusController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, leadService_1.updateLeadStatusService)(req.params.id, req.body);
    res.status(200).json({
        success: true,
        message: 'Lead status updated successfully',
        data: result,
    });
}));
exports.backLeadController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, leadService_1.backLeadService)(req.params.id, req.body);
    res.status(200).json({
        success: true,
        message: 'Lead back successfully',
        data: result,
    });
}));
// bulk soft delete controller
exports.bulkSoftDeleteLeadController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ids, user } = req.body;
    if (!ids || !Array.isArray(ids) || ids.length === 0)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'ids is required !');
    const result = yield (0, leadService_1.bulkSoftDeleteLeadService)(ids, user);
    res.status(200).json({
        success: true,
        message: 'Leads delete successfully',
        data: result,
    });
}));
exports.bulkBackLeadController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ids, user } = req.body;
    if (!ids || !Array.isArray(ids) || ids.length === 0)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'ids is required !');
    const result = yield (0, leadService_1.bulkBackLeadService)(ids, user);
    res.status(200).json({
        success: true,
        message: 'Leads back successfully',
        data: result,
    });
}));
