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
exports.deleteRoleService = exports.updateRoleService = exports.getSingleRoleService = exports.getAllRoleService = exports.addRoleService = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const roleModel_1 = require("./roleModel");
const http_status_1 = __importDefault(require("http-status"));
const addRoleService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield roleModel_1.Role.create(data);
    return result;
});
exports.addRoleService = addRoleService;
const getAllRoleService = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield roleModel_1.Role.find();
    return result;
});
exports.getAllRoleService = getAllRoleService;
const getSingleRoleService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield roleModel_1.Role.findById(id);
    return result;
});
exports.getSingleRoleService = getSingleRoleService;
const updateRoleService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield roleModel_1.Role.findById(id);
    if (!isExist)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Role not found!');
    const result = yield roleModel_1.Role.findByIdAndUpdate(id, data, { new: true });
    return result;
});
exports.updateRoleService = updateRoleService;
const deleteRoleService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield roleModel_1.Role.findById(id);
    if (!isExist)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Role not found!');
    const result = yield roleModel_1.Role.findByIdAndDelete(id);
    return result;
});
exports.deleteRoleService = deleteRoleService;
