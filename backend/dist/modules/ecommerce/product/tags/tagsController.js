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
exports.deleteTagsController = exports.updateTagsController = exports.getSingleTagsController = exports.getAllTagsController = exports.addTagsController = void 0;
const catchAsync_1 = require("../../../../utils/catchAsync");
const tagsService_1 = require("./tagsService");
exports.addTagsController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, tagsService_1.addTagsService)(req.body);
    res.status(200).json({
        success: true,
        message: 'Tags add successfully',
        data: result,
    });
}));
exports.getAllTagsController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, tagsService_1.getAllTagsService)();
    res.status(200).json({
        success: true,
        message: 'Tags get successfully',
        data: result,
    });
}));
exports.getSingleTagsController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield (0, tagsService_1.getSingleTagsService)(id);
    res.status(200).json({
        success: true,
        message: 'Tags get successfully',
        data: result,
    });
}));
exports.updateTagsController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield (0, tagsService_1.updateTagsService)(id, req.body);
    res.status(200).json({
        success: true,
        message: 'Tags update successfully',
        data: result,
    });
}));
exports.deleteTagsController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield (0, tagsService_1.deleteTagsService)(id);
    res.status(200).json({
        success: true,
        message: 'Tags delete successfully',
    });
}));
