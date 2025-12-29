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
exports.deleteKitController = exports.updateKitController = exports.getByIdKitController = exports.getAllKitController = exports.createKitController = void 0;
const catchAsync_1 = require("../../../utils/catchAsync");
const makeSlug_1 = require("../../../utils/makeSlug");
const kitService_1 = require("./kitService");
exports.createKitController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const image = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
    if (!image) {
        res.status(400).json({
            success: false,
            message: 'Image is required',
        });
        return;
    }
    const kitData = Object.assign(Object.assign({}, req.body), { image: `kit/${image}`, slug: (0, makeSlug_1.makeSlug)(req.body.name) });
    const result = yield (0, kitService_1.createKitService)(kitData);
    res.status(201).json({
        success: true,
        message: 'Kit created successfully',
        data: result,
    });
}));
exports.getAllKitController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { meta, data } = yield (0, kitService_1.getAllKitService)(req.query);
    res.status(200).json({
        success: true,
        message: 'Kits retrieved successfully',
        meta,
        data,
    });
}));
exports.getByIdKitController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, kitService_1.getByIdKitService)(req.params.id);
    res.status(200).json({
        success: true,
        message: 'Kit retrieved successfully',
        data: result,
    });
}));
exports.updateKitController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const image = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
    const { id } = req.params;
    const kitData = Object.assign({}, req.body);
    if (image) {
        kitData.image = `kit/${image}`;
    }
    if (kitData.name) {
        kitData.slug = (0, makeSlug_1.makeSlug)(kitData.name);
    }
    const result = yield (0, kitService_1.updateKitService)(id, kitData);
    res.status(200).json({
        success: true,
        message: 'Kit updated successfully',
        data: result,
    });
}));
exports.deleteKitController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, kitService_1.deleteKitService)(req.params.id);
    res.status(200).json({
        success: true,
        message: 'Kit deleted successfully',
    });
}));
