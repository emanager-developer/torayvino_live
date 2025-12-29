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
exports.updateContactService = exports.getContactService = exports.addContactService = void 0;
const AppError_1 = __importDefault(require("../../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const contactModel_1 = require("./contactModel");
const addContactService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield contactModel_1.Contact.findOne();
    if (isExist)
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Contact already exist');
    const result = yield contactModel_1.Contact.create(data);
    return result;
});
exports.addContactService = addContactService;
const getContactService = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield contactModel_1.Contact.findOne();
    return result;
});
exports.getContactService = getContactService;
const updateContactService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield contactModel_1.Contact.findById(id);
    if (!isExist)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Contact not found');
    const result = yield contactModel_1.Contact.findByIdAndUpdate(id, data, { new: true });
    return result;
});
exports.updateContactService = updateContactService;
