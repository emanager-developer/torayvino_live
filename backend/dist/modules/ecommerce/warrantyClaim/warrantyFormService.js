"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.exportWarrantyClaimService = exports.updateNoteWarrantyFormService = exports.updateWarrantyFormStatusService = exports.deleteWarrantyFormService = exports.updateWarrantyFormService = exports.getWarrantyFormsByCustomerPhone = exports.getSingleWarrantyFormService = exports.getAllWarrantyFormService = exports.addWarrantyFormService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../../errors/AppError"));
const warrantyFormModel_1 = require("./warrantyFormModel");
const sendEmail_1 = require("../../../utils/sendEmail");
const QueryBuilder_1 = __importDefault(require("../../../builders/QueryBuilder"));
const xlsx = __importStar(require("xlsx"));
const addWarrantyFormService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield warrantyFormModel_1.WarrantyForm.create(data);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create warranty form');
    }
    if (result) {
        // send notification email to admin
        yield (0, sendEmail_1.notificationForWarrantyClaimSubmit)(data);
    }
    return result;
});
exports.addWarrantyFormService = addWarrantyFormService;
const getAllWarrantyFormService = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield warrantyFormModel_1.WarrantyForm.find({});
    return result;
});
exports.getAllWarrantyFormService = getAllWarrantyFormService;
const getSingleWarrantyFormService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield warrantyFormModel_1.WarrantyForm.findById(id);
    return result;
});
exports.getSingleWarrantyFormService = getSingleWarrantyFormService;
const getWarrantyFormsByCustomerPhone = (phone) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield warrantyFormModel_1.WarrantyForm.find({ phone });
    return result;
});
exports.getWarrantyFormsByCustomerPhone = getWarrantyFormsByCustomerPhone;
const updateWarrantyFormService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield warrantyFormModel_1.WarrantyForm.findById(id);
    if (!isExist)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'WarrantyForm not found !');
    const result = yield warrantyFormModel_1.WarrantyForm.findByIdAndUpdate(id, data, { new: true });
    return result;
});
exports.updateWarrantyFormService = updateWarrantyFormService;
const deleteWarrantyFormService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield warrantyFormModel_1.WarrantyForm.findById(id);
    if (!isExist)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'WarrantyForm not found !');
    yield warrantyFormModel_1.WarrantyForm.findByIdAndDelete(id);
    return true;
});
exports.deleteWarrantyFormService = deleteWarrantyFormService;
const updateWarrantyFormStatusService = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield warrantyFormModel_1.WarrantyForm.findById(id);
    if (!isExist)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'WarrantyForm not found !');
    const result = yield warrantyFormModel_1.WarrantyForm.findByIdAndUpdate(id, { status }, { new: true });
    return result;
});
exports.updateWarrantyFormStatusService = updateWarrantyFormStatusService;
const updateNoteWarrantyFormService = (id, notes) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield warrantyFormModel_1.WarrantyForm.findById(id);
    if (!isExist)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'WarrantyForm not found !');
    const result = yield warrantyFormModel_1.WarrantyForm.findByIdAndUpdate(id, { notes }, { new: true });
    // eslint-disable-next-line no-console
    console.log(result);
    return result;
});
exports.updateNoteWarrantyFormService = updateNoteWarrantyFormService;
const exportWarrantyClaimService = (options) => __awaiter(void 0, void 0, void 0, function* () {
    const { ids, query, paginate } = options || {};
    let warrantyFormsQuery;
    if (ids && Array.isArray(ids) && ids.length > 0) {
        warrantyFormsQuery = warrantyFormModel_1.WarrantyForm.find({ _id: { $in: ids } });
    }
    else {
        const qb = new QueryBuilder_1.default(warrantyFormModel_1.WarrantyForm.find(), query || {})
            .search([])
            .filter()
            .sort()
            .fields();
        if (paginate || (query && (query.page || query.limit || query.paginate))) {
            qb.paginate();
        }
        warrantyFormsQuery = qb.modelQuery;
    }
    const warrantyForms = yield warrantyFormsQuery.lean();
    const rows = (warrantyForms || []).map((item) => {
        var _a, _b, _c, _d;
        return {
            ID: item._id,
            Name: item.name || "",
            Phone: item.phone || "",
            Email: item.email || "",
            Device: item.device || "",
            ProblemDescription: ((_c = (_b = (_a = item.problemDescription) === null || _a === void 0 ? void 0 : _a.replace(/\n/g, " ")) === null || _b === void 0 ? void 0 : _b.replace(/\s+/g, " ")) === null || _c === void 0 ? void 0 : _c.trim()) || "",
            Address: item.address || "",
            PurchaseDate: item.purchaseDate
                ? new Date(item.purchaseDate).toLocaleDateString()
                : "",
            InvoiceNumber: item.invoiceNumber || "",
            PurchasePlace: item.purchasePlace || "",
            ImagesCount: ((_d = item.images) === null || _d === void 0 ? void 0 : _d.length) || 0,
            Status: item.status || "",
            ServiceMethod: item.serviceMethod || "",
            ProblemCategory: item.problemCategory || "",
            Notes: item.notes || "",
        };
    });
    const worksheet = xlsx.utils.json_to_sheet(rows);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, "WarrantyClaims");
    const csv = xlsx.write(workbook, { bookType: "csv", type: "buffer" });
    return csv;
});
exports.exportWarrantyClaimService = exportWarrantyClaimService;
