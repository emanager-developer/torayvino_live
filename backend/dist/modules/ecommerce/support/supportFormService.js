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
exports.deleteSupportFormService = exports.updateSupportFormService = exports.getSupportsByCustomerPhone = exports.getSingleSupportFormService = exports.getAllSupportFormService = exports.addSupportFormService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../../errors/AppError"));
const supportFormModel_1 = require("./supportFormModel");
const sendEmail_1 = require("../../../utils/sendEmail");
const addSupportFormService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield supportFormModel_1.SupportForm.create(data);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create support form');
    }
    if (result) {
        // send notification email to admin
        yield (0, sendEmail_1.notificationForSupportSubmit)(data);
    }
    return result;
});
exports.addSupportFormService = addSupportFormService;
const getAllSupportFormService = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield supportFormModel_1.SupportForm.find({});
    return result;
});
exports.getAllSupportFormService = getAllSupportFormService;
const getSingleSupportFormService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield supportFormModel_1.SupportForm.findById(id);
    return result;
});
exports.getSingleSupportFormService = getSingleSupportFormService;
const getSupportsByCustomerPhone = (phone) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield supportFormModel_1.SupportForm.find({ phone });
    return result;
});
exports.getSupportsByCustomerPhone = getSupportsByCustomerPhone;
const updateSupportFormService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield supportFormModel_1.SupportForm.findById(id);
    if (!isExist)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'SupportForm not found !');
    const result = yield supportFormModel_1.SupportForm.findByIdAndUpdate(id, data, { new: true });
    return result;
});
exports.updateSupportFormService = updateSupportFormService;
const deleteSupportFormService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield supportFormModel_1.SupportForm.findById(id);
    if (!isExist)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'SupportForm not found !');
    yield supportFormModel_1.SupportForm.findByIdAndDelete(id);
    return true;
});
exports.deleteSupportFormService = deleteSupportFormService;
