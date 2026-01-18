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
exports.updateAboutController = exports.getAboutController = exports.addAboutController = void 0;
const aboutService_1 = require("./aboutService");
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = require("../../../utils/catchAsync");
const AppError_1 = __importDefault(require("../../../errors/AppError"));
const deleteFile_1 = require("../../../utils/deleteFile");
exports.addAboutController = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const files = req.files || [];
    const heroFile = files.find((f) => f.fieldname === 'image');
    const heroImage = heroFile === null || heroFile === void 0 ? void 0 : heroFile.filename;
    const testimonialImagesByIndex = new Map();
    for (const file of files) {
        const match = file.fieldname.match(/^testimonialImage_(\d+)$/);
        if (match === null || match === void 0 ? void 0 : match[1]) {
            testimonialImagesByIndex.set(Number(match[1]), `/about/${file.filename}`);
        }
    }
    if (!heroImage)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'About image is required !');
    const incomingTestimonials = ((_a = req.body) === null || _a === void 0 ? void 0 : _a.testimonials) && Array.isArray(req.body.testimonials)
        ? req.body.testimonials
        : ((_b = req.body) === null || _b === void 0 ? void 0 : _b.testimonial)
            ? [req.body.testimonial]
            : undefined;
    const testimonials = incomingTestimonials === null || incomingTestimonials === void 0 ? void 0 : incomingTestimonials.map((t, index) => (Object.assign(Object.assign({}, t), { image: testimonialImagesByIndex.get(index) || (t === null || t === void 0 ? void 0 : t.image) })));
    const data = Object.assign(Object.assign({ image: `/about/${heroImage}` }, req.body), { testimonials });
    try {
        const result = yield (0, aboutService_1.addAboutService)(data);
        res.status(200).json({
            success: true,
            message: 'About add successfully',
            data: result,
        });
    }
    catch (error) {
        if (heroImage)
            (0, deleteFile_1.deleteFile)(`./uploads/about/${heroImage}`);
        for (const file of files) {
            if (file.fieldname.startsWith('testimonialImage_')) {
                (0, deleteFile_1.deleteFile)(`./uploads/about/${file.filename}`);
            }
        }
        next(error);
    }
}));
exports.getAboutController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, aboutService_1.getAboutService)();
    res.status(200).json({
        success: true,
        message: 'About get successfully',
        data: result,
    });
}));
exports.updateAboutController = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const files = req.files || [];
    const heroFile = files.find((f) => f.fieldname === 'image');
    const heroImage = heroFile === null || heroFile === void 0 ? void 0 : heroFile.filename;
    const testimonialImagesByIndex = new Map();
    for (const file of files) {
        const match = file.fieldname.match(/^testimonialImage_(\d+)$/);
        if (match === null || match === void 0 ? void 0 : match[1]) {
            testimonialImagesByIndex.set(Number(match[1]), `/about/${file.filename}`);
        }
    }
    const id = req.params.id;
    const incomingTestimonials = ((_a = req.body) === null || _a === void 0 ? void 0 : _a.testimonials) && Array.isArray(req.body.testimonials)
        ? req.body.testimonials
        : undefined;
    const testimonials = incomingTestimonials === null || incomingTestimonials === void 0 ? void 0 : incomingTestimonials.map((t, index) => (Object.assign(Object.assign({}, t), { image: testimonialImagesByIndex.get(index) || (t === null || t === void 0 ? void 0 : t.image) })));
    const data = Object.assign(Object.assign({ image: heroImage ? `/about/${heroImage}` : undefined }, req.body), { testimonials });
    try {
        const result = yield (0, aboutService_1.updateAboutService)(data, id);
        res.status(200).json({
            success: true,
            message: 'About update successfully',
            data: result,
        });
    }
    catch (error) {
        if (heroImage)
            (0, deleteFile_1.deleteFile)(`./uploads/about/${heroImage}`);
        for (const file of files) {
            if (file.fieldname.startsWith('testimonialImage_')) {
                (0, deleteFile_1.deleteFile)(`./uploads/about/${file.filename}`);
            }
        }
        next(error);
    }
}));
