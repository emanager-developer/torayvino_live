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
exports.deleteLeadSourceService = exports.updateLeadSourceService = exports.getLeadSourceByIdService = exports.getAllLeadSourceService = exports.createLeadSourceService = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const leadSourceModel_1 = require("./leadSourceModel");
const createLeadSourceService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield leadSourceModel_1.LeadSource.create(data);
    return result;
});
exports.createLeadSourceService = createLeadSourceService;
const getAllLeadSourceService = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield leadSourceModel_1.LeadSource.find().sort({ order: 1 });
    return result;
});
exports.getAllLeadSourceService = getAllLeadSourceService;
const getLeadSourceByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield leadSourceModel_1.LeadSource.findById(id);
    return result;
});
exports.getLeadSourceByIdService = getLeadSourceByIdService;
const updateLeadSourceService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield leadSourceModel_1.LeadSource.findById(id);
    if (!isExist)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Service not found');
    const result = yield leadSourceModel_1.LeadSource.findByIdAndUpdate(id, data, { new: true });
    return result;
});
exports.updateLeadSourceService = updateLeadSourceService;
const deleteLeadSourceService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield leadSourceModel_1.LeadSource.findByIdAndDelete(id);
    return result;
});
exports.deleteLeadSourceService = deleteLeadSourceService;
