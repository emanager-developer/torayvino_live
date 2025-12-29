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
exports.deleteMarketingTargetService = exports.updateMarketingTargetService = exports.getByIdMarketingTargetService = exports.getAllMarketingTargetService = exports.createMarketingTargetService = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const QueryBuilder_1 = __importDefault(require("../../builders/QueryBuilder"));
const marketingTargetModel_1 = require("./marketingTargetModel");
const createMarketingTargetService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield marketingTargetModel_1.MarketingTarget.create(data);
    return result;
});
exports.createMarketingTargetService = createMarketingTargetService;
const getAllMarketingTargetService = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const MarketingTargetQuery = new QueryBuilder_1.default(marketingTargetModel_1.MarketingTarget.find().populate('user addedBy', 'name'), query)
        .search([''])
        .filter()
        .sort()
        .paginate()
        .fields();
    const meta = yield MarketingTargetQuery.countTotal();
    const data = yield MarketingTargetQuery.modelQuery;
    return {
        meta,
        data,
    };
});
exports.getAllMarketingTargetService = getAllMarketingTargetService;
const getByIdMarketingTargetService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield marketingTargetModel_1.MarketingTarget.findById(id).populate('user addedBy', 'name');
    return result;
});
exports.getByIdMarketingTargetService = getByIdMarketingTargetService;
const updateMarketingTargetService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield marketingTargetModel_1.MarketingTarget.findById(id);
    if (!isExist)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'MarketingTarget not found');
    const result = yield marketingTargetModel_1.MarketingTarget.findByIdAndUpdate(id, data, {
        new: true,
    });
    return result;
});
exports.updateMarketingTargetService = updateMarketingTargetService;
const deleteMarketingTargetService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield marketingTargetModel_1.MarketingTarget.findByIdAndDelete(id);
    return result;
});
exports.deleteMarketingTargetService = deleteMarketingTargetService;
