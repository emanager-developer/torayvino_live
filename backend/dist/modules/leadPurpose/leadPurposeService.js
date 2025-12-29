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
exports.deleteLeadPurposeService = exports.updateLeadPurposeService = exports.getLeadPurposeByIdService = exports.getAllLeadPurposeService = exports.createLeadPurposeService = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const leadPurposeModel_1 = require("./leadPurposeModel");
const createLeadPurposeService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield leadPurposeModel_1.LeadPurpose.create(data);
    return result;
});
exports.createLeadPurposeService = createLeadPurposeService;
const getAllLeadPurposeService = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield leadPurposeModel_1.LeadPurpose.find().sort({ order: 1 });
    return result;
});
exports.getAllLeadPurposeService = getAllLeadPurposeService;
const getLeadPurposeByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield leadPurposeModel_1.LeadPurpose.findById(id);
    return result;
});
exports.getLeadPurposeByIdService = getLeadPurposeByIdService;
const updateLeadPurposeService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield leadPurposeModel_1.LeadPurpose.findById(id);
    if (!isExist)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Service not found');
    const result = yield leadPurposeModel_1.LeadPurpose.findByIdAndUpdate(id, data, { new: true });
    return result;
});
exports.updateLeadPurposeService = updateLeadPurposeService;
const deleteLeadPurposeService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield leadPurposeModel_1.LeadPurpose.findByIdAndDelete(id);
    return result;
});
exports.deleteLeadPurposeService = deleteLeadPurposeService;
