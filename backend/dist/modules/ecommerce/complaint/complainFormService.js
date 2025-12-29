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
exports.deleteComplaintFormService = exports.updateComplaintFormService = exports.getComplaintsByCustomerPhone = exports.getSingleComplaintFormService = exports.getAllComplaintFormService = exports.addComplaintFormService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../../errors/AppError"));
const complainFormModel_1 = require("./complainFormModel");
const sendEmail_1 = require("../../../utils/sendEmail");
const addComplaintFormService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield complainFormModel_1.ComplainForm.create(data);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create complaint form');
    }
    if (result) {
        // send notification email to admin
        yield (0, sendEmail_1.notificationForComplaintSubmit)(data);
    }
    return result;
});
exports.addComplaintFormService = addComplaintFormService;
const getAllComplaintFormService = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield complainFormModel_1.ComplainForm.find({});
    return result;
});
exports.getAllComplaintFormService = getAllComplaintFormService;
const getSingleComplaintFormService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield complainFormModel_1.ComplainForm.findById(id);
    return result;
});
exports.getSingleComplaintFormService = getSingleComplaintFormService;
const getComplaintsByCustomerPhone = (phone) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield complainFormModel_1.ComplainForm.find({ phone });
    return result;
});
exports.getComplaintsByCustomerPhone = getComplaintsByCustomerPhone;
const updateComplaintFormService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield complainFormModel_1.ComplainForm.findById(id);
    if (!isExist)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'ComplainForm not found !');
    const result = yield complainFormModel_1.ComplainForm.findByIdAndUpdate(id, data, { new: true });
    return result;
});
exports.updateComplaintFormService = updateComplaintFormService;
const deleteComplaintFormService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield complainFormModel_1.ComplainForm.findById(id);
    if (!isExist)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'ComplainForm not found !');
    yield complainFormModel_1.ComplainForm.findByIdAndDelete(id);
    return true;
});
exports.deleteComplaintFormService = deleteComplaintFormService;
