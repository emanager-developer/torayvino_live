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
exports.deleteBankController = exports.updateBankController = exports.getSingleBankController = exports.getAllBanksController = exports.createBankController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = require("../../../utils/catchAsync");
const AppError_1 = __importDefault(require("../../../errors/AppError"));
const deleteFile_1 = require("../../../utils/deleteFile");
const emiService_1 = require("./emiService");
// Create a new bank with EMI options
exports.createBankController = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const logo = (_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.filename;
    if (!logo) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Bank logo is required!');
    }
    const data = Object.assign({ logo: `/emi/${logo}` }, req.body);
    try {
        const result = yield (0, emiService_1.createBankService)(data);
        res.status(201).json({
            success: true,
            message: 'Bank created successfully',
            data: result,
        });
    }
    catch (error) {
        (0, deleteFile_1.deleteFile)(`./uploads/emi/${logo}`);
        next(error);
    }
}));
// Get all banks
exports.getAllBanksController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { meta, data } = yield (0, emiService_1.getAllBanksService)(req.query);
    res.status(200).json({
        success: true,
        message: 'Banks retrieved successfully',
        meta,
        data,
    });
}));
// Get single bank by ID
exports.getSingleBankController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield (0, emiService_1.getSingleBankService)(id);
    res.status(200).json({
        success: true,
        message: 'Bank retrieved successfully',
        data: result,
    });
}));
// Update bank information
exports.updateBankController = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    const logo = (_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.filename;
    const data = Object.assign(Object.assign({}, req.body), (logo && { logo: `/emi/${logo}` }));
    try {
        const result = yield (0, emiService_1.updateBankService)(id, data);
        res.status(200).json({
            success: true,
            message: 'Bank updated successfully',
            data: result,
        });
    }
    catch (error) {
        if (logo) {
            (0, deleteFile_1.deleteFile)(`./uploads/emi/${logo}`);
        }
        next(error);
    }
}));
// Delete bank
exports.deleteBankController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield (0, emiService_1.deleteBankService)(id);
    res.status(200).json({
        success: true,
        message: 'Bank deleted successfully',
        data: result,
    });
}));
