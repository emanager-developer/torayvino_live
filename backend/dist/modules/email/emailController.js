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
exports.updateEmailController = exports.getEmailController = exports.createEmailController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const emailService_1 = require("./emailService");
exports.createEmailController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, emailService_1.createEmailService)(req.body);
    res.status(200).json({
        success: true,
        message: 'Email add successfully',
        data: result,
    });
}));
exports.getEmailController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, emailService_1.getEmailService)();
    res.status(200).json({
        success: true,
        message: 'Email get successfully',
        data: result,
    });
}));
exports.updateEmailController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, emailService_1.updateEmailService)(req.params.id, req.body);
    res.status(200).json({
        success: true,
        message: 'Email update successfully',
        data: result,
    });
}));
