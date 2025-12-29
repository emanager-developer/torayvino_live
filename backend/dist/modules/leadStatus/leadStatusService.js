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
exports.deleteLeadStatusService = exports.updateLeadStatusService = exports.getLeadStatusByIdService = exports.getAllLeadStatusService = exports.createLeadStatusService = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const leadStatusModel_1 = require("./leadStatusModel");
const makeSlug_1 = require("../../utils/makeSlug");
const createLeadStatusService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const newData = Object.assign(Object.assign({}, data), { value: (0, makeSlug_1.makeSlug)(data.name) });
    const result = yield leadStatusModel_1.LeadStatus.create(newData);
    return result;
});
exports.createLeadStatusService = createLeadStatusService;
const getAllLeadStatusService = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield leadStatusModel_1.LeadStatus.find().sort({ order: 1 });
    return result;
});
exports.getAllLeadStatusService = getAllLeadStatusService;
const getLeadStatusByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield leadStatusModel_1.LeadStatus.findById(id);
    return result;
});
exports.getLeadStatusByIdService = getLeadStatusByIdService;
const updateLeadStatusService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const newData = Object.assign(Object.assign({}, data), { value: (0, makeSlug_1.makeSlug)(data.name) });
    const isExist = yield leadStatusModel_1.LeadStatus.findById(id);
    if (!isExist)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Lead Status not found');
    const result = yield leadStatusModel_1.LeadStatus.findByIdAndUpdate(id, newData, { new: true });
    return result;
});
exports.updateLeadStatusService = updateLeadStatusService;
const deleteLeadStatusService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield leadStatusModel_1.LeadStatus.findByIdAndDelete(id);
    return result;
});
exports.deleteLeadStatusService = deleteLeadStatusService;
