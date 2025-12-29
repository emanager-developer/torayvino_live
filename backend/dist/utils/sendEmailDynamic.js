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
exports.sendEmailDynamic = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../config"));
const emailModel_1 = require("../modules/email/emailModel");
const AppError_1 = __importDefault(require("../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const sendEmailDynamic = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const emailConfig = yield emailModel_1.Email.findOne();
    if (!emailConfig)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Email configuration not found');
    const transporter = nodemailer_1.default.createTransport({
        host: emailConfig === null || emailConfig === void 0 ? void 0 : emailConfig.host,
        port: (emailConfig === null || emailConfig === void 0 ? void 0 : emailConfig.port) | 587,
        secure: config_1.default.NODE_ENV === 'production',
        auth: {
            user: emailConfig === null || emailConfig === void 0 ? void 0 : emailConfig.user,
            pass: emailConfig === null || emailConfig === void 0 ? void 0 : emailConfig.pass,
        },
    });
    yield transporter.sendMail({
        from: emailConfig === null || emailConfig === void 0 ? void 0 : emailConfig.user,
        to: Array.isArray(data.to) ? data.to.join(',') : data.to,
        subject: data.subject,
        text: '',
        html: data.body,
    });
});
exports.sendEmailDynamic = sendEmailDynamic;
