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
exports.updateEmailService = exports.getEmailService = exports.createEmailService = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const emailModel_1 = require("./emailModel");
const createEmailService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield emailModel_1.Email.findOne();
    if (isExist)
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Email already exists!');
    const result = yield emailModel_1.Email.create(data);
    return result;
});
exports.createEmailService = createEmailService;
const getEmailService = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield emailModel_1.Email.findOne();
    if (!result)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Email not found!');
    return result;
});
exports.getEmailService = getEmailService;
const updateEmailService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield emailModel_1.Email.findById(id);
    if (!isExist)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Email not found!');
    const result = yield emailModel_1.Email.findByIdAndUpdate(id, data, { new: true });
    return result;
});
exports.updateEmailService = updateEmailService;
