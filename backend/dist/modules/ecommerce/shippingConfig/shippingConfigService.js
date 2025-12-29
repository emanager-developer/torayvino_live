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
exports.deleteShippingConfigService = exports.updateShippingConfigService = exports.getSingleShippingConfigService = exports.getAllShippingConfigService = exports.addShippingConfigService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../../errors/AppError"));
const shippingConfigModel_1 = require("./shippingConfigModel");
const addShippingConfigService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield shippingConfigModel_1.ShippingConfig.create(data);
    return result;
});
exports.addShippingConfigService = addShippingConfigService;
const getAllShippingConfigService = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield shippingConfigModel_1.ShippingConfig.find({});
    return result;
});
exports.getAllShippingConfigService = getAllShippingConfigService;
const getSingleShippingConfigService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield shippingConfigModel_1.ShippingConfig.findById(id);
    return result;
});
exports.getSingleShippingConfigService = getSingleShippingConfigService;
const updateShippingConfigService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield shippingConfigModel_1.ShippingConfig.findById(id);
    if (!isExist)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'ShippingConfig not found !');
    const result = yield shippingConfigModel_1.ShippingConfig.findByIdAndUpdate(id, data, {
        new: true,
    });
    return result;
});
exports.updateShippingConfigService = updateShippingConfigService;
const deleteShippingConfigService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield shippingConfigModel_1.ShippingConfig.findById(id);
    if (!isExist)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'ShippingConfig not found !');
    yield shippingConfigModel_1.ShippingConfig.findByIdAndDelete(id);
    return true;
});
exports.deleteShippingConfigService = deleteShippingConfigService;
