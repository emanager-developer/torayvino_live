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
exports.deleteBankService = exports.updateBankService = exports.getSingleBankService = exports.getAllBanksService = exports.createBankService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const QueryBuilder_1 = __importDefault(require("../../../builders/QueryBuilder"));
const AppError_1 = __importDefault(require("../../../errors/AppError"));
const emiModel_1 = __importDefault(require("./emiModel"));
// Create a new bank with EMI options
const createBankService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield emiModel_1.default.create(payload);
    return result;
});
exports.createBankService = createBankService;
// Get all banks with pagination
const getAllBanksService = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const bankQuery = new QueryBuilder_1.default(emiModel_1.default.find(), query)
        .paginate()
        .fields();
    const meta = yield bankQuery.countTotal();
    const data = yield bankQuery.modelQuery;
    return {
        meta,
        data,
    };
});
exports.getAllBanksService = getAllBanksService;
// Get single bank by ID
const getSingleBankService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Invalid bank ID');
    }
    const result = yield emiModel_1.default.findById(id);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Bank not found');
    }
    return result;
});
exports.getSingleBankService = getSingleBankService;
// Update bank information
const updateBankService = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Invalid bank ID');
    }
    const result = yield emiModel_1.default.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Bank not found');
    }
    return result;
});
exports.updateBankService = updateBankService;
// Delete bank
const deleteBankService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Invalid bank ID');
    }
    const result = yield emiModel_1.default.findByIdAndDelete(id);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Bank not found');
    }
    return result;
});
exports.deleteBankService = deleteBankService;
