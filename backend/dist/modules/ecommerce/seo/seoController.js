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
exports.updateSeo = exports.getSeo = exports.createSeo = void 0;
const catchAsync_1 = require("../../../utils/catchAsync");
const seoService_1 = require("./seoService");
exports.createSeo = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const result = yield (0, seoService_1.createSeoService)(data);
    res.status(200).json({
        success: true,
        message: 'Seo create successfully',
        data: result,
    });
}));
exports.getSeo = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, seoService_1.getSeoService)();
    res.status(200).json({
        success: true,
        message: 'Seo get successfully',
        data: result,
    });
}));
exports.updateSeo = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const data = req.body;
    const result = yield (0, seoService_1.updateSeoService)(id, data);
    res.status(200).json({
        success: true,
        message: 'Seo update successfully',
        data: result,
    });
}));
