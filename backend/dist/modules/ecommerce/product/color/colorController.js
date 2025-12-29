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
exports.deleteColorController = exports.updateColorController = exports.getSingleColorController = exports.getAllColorController = exports.addColorController = void 0;
const catchAsync_1 = require("../../../../utils/catchAsync");
const colorService_1 = require("./colorService");
exports.addColorController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, colorService_1.addColorService)(req.body);
    res.status(200).json({
        success: true,
        message: 'Color add successfully',
        data: result,
    });
}));
exports.getAllColorController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, colorService_1.getAllColorService)();
    res.status(200).json({
        success: true,
        message: 'Colors get successfully',
        data: result,
    });
}));
exports.getSingleColorController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield (0, colorService_1.getSingleColorService)(id);
    res.status(200).json({
        success: true,
        message: 'Color get successfully',
        data: result,
    });
}));
exports.updateColorController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield (0, colorService_1.updateColorService)(id, req.body);
    res.status(200).json({
        success: true,
        message: 'Color update successfully',
        data: result,
    });
}));
exports.deleteColorController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield (0, colorService_1.deleteColorService)(id);
    res.status(200).json({
        success: true,
        message: 'Color delete successfully',
    });
}));
