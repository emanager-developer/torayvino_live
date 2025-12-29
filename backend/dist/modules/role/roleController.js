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
exports.deleteRoleController = exports.updateRoleController = exports.getSingleRoleController = exports.getAllRoleController = exports.addRoleController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const roleService_1 = require("./roleService");
exports.addRoleController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, roleService_1.addRoleService)(req.body);
    res.status(200).json({
        success: true,
        message: 'role add successfully',
        data: result,
    });
}));
exports.getAllRoleController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, roleService_1.getAllRoleService)();
    res.status(200).json({
        success: true,
        message: 'role get successfully',
        data: result,
    });
}));
exports.getSingleRoleController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, roleService_1.getSingleRoleService)(req.params.id);
    res.status(200).json({
        success: true,
        message: 'role get successfully',
        data: result,
    });
}));
exports.updateRoleController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const id = req.params.id;
    const result = yield (0, roleService_1.updateRoleService)(id, data);
    res.status(200).json({
        success: true,
        message: 'role update successfully',
        data: result,
    });
}));
exports.deleteRoleController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    yield (0, roleService_1.deleteRoleService)(id);
    res.status(200).json({
        success: true,
        message: 'role delete successfully',
    });
}));
