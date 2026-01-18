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
exports.updateProductFeatureController = exports.trueProductIsShowController = exports.deleteProductController = exports.updateProductController = exports.getBySlugProductController = exports.getByIdProductController = exports.getAllProductController = exports.createProductController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const productService_1 = require("./productService");
const catchAsync_1 = require("../../../../utils/catchAsync");
const AppError_1 = __importDefault(require("../../../../errors/AppError"));
const makeSlug_1 = require("../../../../utils/makeSlug");
const deleteFile_1 = require("../../../../utils/deleteFile");
const productModel_1 = require("./productModel");
const MAX_IMAGE_BYTES = 2 * 1024 * 1024; // 2MB
const MAX_PDF_BYTES = 10 * 1024 * 1024; // 10MB
const parseTags = (input) => {
    if (Array.isArray(input)) {
        return input.map((t) => String(t).trim()).filter(Boolean);
    }
    if (typeof input === 'string') {
        const raw = input.trim();
        if (!raw)
            return [];
        if (raw.startsWith('[')) {
            try {
                const parsed = JSON.parse(raw);
                if (Array.isArray(parsed)) {
                    return parsed.map((t) => String(t).trim()).filter(Boolean);
                }
            }
            catch (_a) {
                // fall back to legacy parsing below
            }
        }
        return raw
            .split(';')
            .map((t) => t.trim())
            .filter(Boolean);
    }
    return [];
};
exports.createProductController = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    const files = ((_a = req.files) !== null && _a !== void 0 ? _a : {});
    let thumbnail = null;
    let galleries = [];
    let productManual = null;
    let variantImages = [];
    try {
        if (!((_b = files === null || files === void 0 ? void 0 : files.thumbnail) === null || _b === void 0 ? void 0 : _b[0])) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Thumbnail is required');
        }
        if (files.thumbnail[0].size > MAX_IMAGE_BYTES) {
            throw new AppError_1.default(http_status_1.default.REQUEST_ENTITY_TOO_LARGE, 'Thumbnail must be <= 2MB');
        }
        if ((_c = files.gallery) === null || _c === void 0 ? void 0 : _c.some((f) => f.size > MAX_IMAGE_BYTES)) {
            throw new AppError_1.default(http_status_1.default.REQUEST_ENTITY_TOO_LARGE, 'Each gallery image must be <= 2MB');
        }
        if ((_d = files.variantImages) === null || _d === void 0 ? void 0 : _d.some((f) => f.size > MAX_IMAGE_BYTES)) {
            throw new AppError_1.default(http_status_1.default.REQUEST_ENTITY_TOO_LARGE, 'Each variant image must be <= 2MB');
        }
        if (((_e = files.productManual) === null || _e === void 0 ? void 0 : _e[0]) && files.productManual[0].size > MAX_PDF_BYTES) {
            throw new AppError_1.default(http_status_1.default.REQUEST_ENTITY_TOO_LARGE, 'Product manual must be <= 10MB');
        }
        thumbnail = files.thumbnail[0].filename;
        galleries = files.gallery ? files.gallery.map((f) => f.filename) : [];
        productManual = files.productManual ? files.productManual[0].filename : null;
        variantImages = files.variantImages
            ? files.variantImages.map((f) => ({
                filename: f.filename,
                originalName: f.originalname,
            }))
            : [];
        const { title, price, isVariant, variants, stock, specifications, faq, feature, shortFeature, kits, tags } = req.body;
        // Process variant images if they exist
        let processedVariants = variants;
        if (isVariant && variants && (variantImages === null || variantImages === void 0 ? void 0 : variantImages.length) > 0) {
            processedVariants = variants.map((variant, index) => {
                const variantImage = variantImages.find((img) => img.originalName.includes(`variant-${index}`) ||
                    img.originalName.includes(variant.sku));
                return Object.assign(Object.assign({}, variant), { image: variantImage ? `/product/${variantImage.filename}` : variant.image });
            });
        }
        const product = Object.assign(Object.assign({}, req.body), { thumbnail: `/product/${thumbnail}`, galleries: (galleries === null || galleries === void 0 ? void 0 : galleries.length) > 0
                ? galleries.map((gallery) => `/product/${gallery}`)
                : [], productManual: productManual ? `/product/${productManual}` : undefined, isVariant, variants: isVariant ? processedVariants : [], specifications: specifications || [], faq: faq || [], feature: feature || [], shortFeature: shortFeature || [], kits: kits || [], tags: parseTags(tags), slug: (0, makeSlug_1.makeSlug)(title), price: isVariant && (variants === null || variants === void 0 ? void 0 : variants.length) > 0 ? variants[0].price : price, stock: isVariant && (variants === null || variants === void 0 ? void 0 : variants.length) > 0
                ? variants === null || variants === void 0 ? void 0 : variants.reduce((acc, variant) => acc + Number(variant.stock), 0)
                : stock, rating: 0, reviewer: 0 });
        const result = yield (0, productService_1.createProductService)(product);
        res.status(200).json({
            success: true,
            message: 'Product add successfully',
            data: result,
        });
    }
    catch (error) {
        if (thumbnail)
            (0, deleteFile_1.deleteFile)(`./uploads/product/${thumbnail}`);
        galleries.forEach((gallery) => (0, deleteFile_1.deleteFile)(`./uploads/product/${gallery}`));
        if (productManual)
            (0, deleteFile_1.deleteFile)(`./uploads/product/${productManual}`);
        variantImages.forEach((img) => (0, deleteFile_1.deleteFile)(`./uploads/product/${img.filename}`));
        return next(error);
    }
}));
exports.getAllProductController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { meta, data } = yield (0, productService_1.getAllProductService)(req.query);
    res.status(200).json({
        success: true,
        message: 'Product get successfully',
        meta,
        data,
    });
}));
exports.getByIdProductController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, productService_1.getByIdProductService)(req.params.id);
    if (!result)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Product not found');
    res.status(200).json({
        success: true,
        message: 'Product get successfully',
        data: result,
    });
}));
exports.getBySlugProductController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, productService_1.getBySlugProductService)(req.params.slug);
    if (!result)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Product not found');
    res.status(200).json({
        success: true,
        message: 'Product get successfully',
        data: result,
    });
}));
exports.updateProductController = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    const files = req.files;
    const thumbnail = (files === null || files === void 0 ? void 0 : files.thumbnail) ? files === null || files === void 0 ? void 0 : files.thumbnail[0].filename : null;
    const productManual = (files === null || files === void 0 ? void 0 : files.productManual) ? files === null || files === void 0 ? void 0 : files.productManual[0].filename : null;
    const variantImages = files.variantImages ? files.variantImages.map((f) => ({
        filename: f.filename,
        originalName: f.originalname
    })) : [];
    const newGalleries = (files === null || files === void 0 ? void 0 : files.gallery)
        ? files.gallery.map((f) => f.filename)
        : [];
    try {
        if (((_a = files === null || files === void 0 ? void 0 : files.thumbnail) === null || _a === void 0 ? void 0 : _a[0]) && files.thumbnail[0].size > MAX_IMAGE_BYTES) {
            throw new AppError_1.default(http_status_1.default.REQUEST_ENTITY_TOO_LARGE, 'Thumbnail must be <= 2MB');
        }
        if ((_b = files === null || files === void 0 ? void 0 : files.gallery) === null || _b === void 0 ? void 0 : _b.some((f) => f.size > MAX_IMAGE_BYTES)) {
            throw new AppError_1.default(http_status_1.default.REQUEST_ENTITY_TOO_LARGE, 'Each gallery image must be <= 2MB');
        }
        if ((_c = files === null || files === void 0 ? void 0 : files.variantImages) === null || _c === void 0 ? void 0 : _c.some((f) => f.size > MAX_IMAGE_BYTES)) {
            throw new AppError_1.default(http_status_1.default.REQUEST_ENTITY_TOO_LARGE, 'Each variant image must be <= 2MB');
        }
        if (((_d = files === null || files === void 0 ? void 0 : files.productManual) === null || _d === void 0 ? void 0 : _d[0]) &&
            files.productManual[0].size > MAX_PDF_BYTES) {
            throw new AppError_1.default(http_status_1.default.REQUEST_ENTITY_TOO_LARGE, 'Product manual must be <= 10MB');
        }
        const isExits = yield productModel_1.Product.findById(req.params.id);
        if (!isExits)
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Product not found');
        const { title, price, isVariant, variants, stock, galleriesUrl, specifications, faq, feature, shortFeature, kits, tags } = req.body;
        // Process variant images for update
        let processedVariants = variants;
        if (isVariant && variants && (variantImages === null || variantImages === void 0 ? void 0 : variantImages.length) > 0) {
            processedVariants = variants.map((variant, index) => {
                const variantImage = variantImages.find((img) => img.originalName.includes(`variant-${index}`) ||
                    img.originalName.includes(variant.sku));
                return Object.assign(Object.assign({}, variant), { image: variantImage ? `/product/${variantImage.filename}` : variant.image });
            });
        }
        const product = Object.assign(Object.assign({}, req === null || req === void 0 ? void 0 : req.body), { slug: (0, makeSlug_1.makeSlug)(title), thumbnail: thumbnail ? `/product/${thumbnail}` : isExits === null || isExits === void 0 ? void 0 : isExits.thumbnail, productManual: productManual ? `/product/${productManual}` : isExits === null || isExits === void 0 ? void 0 : isExits.productManual, variants: isVariant ? processedVariants : [], specifications: specifications || (isExits === null || isExits === void 0 ? void 0 : isExits.specifications) || [], faq: faq || (isExits === null || isExits === void 0 ? void 0 : isExits.faq) || [], feature: feature || (isExits === null || isExits === void 0 ? void 0 : isExits.feature) || [], shortFeature: shortFeature || (isExits === null || isExits === void 0 ? void 0 : isExits.shortFeature) || [], kits: kits || (isExits === null || isExits === void 0 ? void 0 : isExits.kits) || [], tags: (tags === undefined ? (isExits === null || isExits === void 0 ? void 0 : isExits.tags) || [] : parseTags(tags)), price: isVariant && (variants === null || variants === void 0 ? void 0 : variants.length) > 0 ? variants[0].price : price, stock: isVariant && (variants === null || variants === void 0 ? void 0 : variants.length) > 0
                ? variants === null || variants === void 0 ? void 0 : variants.reduce((acc, variant) => acc + Number(variant.stock), 0)
                : stock });
        let finalGalleries = [];
        if ((newGalleries === null || newGalleries === void 0 ? void 0 : newGalleries.length) > 0) {
            const newImages = newGalleries.map((gallery) => `/product/${gallery}`);
            finalGalleries.push(...newImages);
        }
        if (isExits === null || isExits === void 0 ? void 0 : isExits.galleries) {
            const filterImages = (_e = isExits === null || isExits === void 0 ? void 0 : isExits.galleries) === null || _e === void 0 ? void 0 : _e.filter((gallery) => galleriesUrl === null || galleriesUrl === void 0 ? void 0 : galleriesUrl.includes(gallery));
            finalGalleries = [...filterImages, ...finalGalleries];
        }
        product.galleries = finalGalleries;
        const result = yield (0, productService_1.updateProductService)(req.params.id, product);
        res.status(200).json({
            success: true,
            message: 'Product update successfully',
            data: result,
        });
        if (result) {
            // Clean up old product manual if a new one is uploaded
            if (productManual && (isExits === null || isExits === void 0 ? void 0 : isExits.productManual)) {
                (0, deleteFile_1.deleteFile)(`./uploads${isExits.productManual}`);
            }
            if (galleriesUrl && (isExits === null || isExits === void 0 ? void 0 : isExits.galleries)) {
                const deletedImages = (_f = isExits === null || isExits === void 0 ? void 0 : isExits.galleries) === null || _f === void 0 ? void 0 : _f.filter((gallery) => !(galleriesUrl === null || galleriesUrl === void 0 ? void 0 : galleriesUrl.includes(gallery)));
                deletedImages === null || deletedImages === void 0 ? void 0 : deletedImages.forEach((image) => {
                    (0, deleteFile_1.deleteFile)(`./uploads/${image}`);
                });
            }
            if (!galleriesUrl && ((_h = (_g = isExits === null || isExits === void 0 ? void 0 : isExits.galleries) === null || _g === void 0 ? void 0 : _g.length) !== null && _h !== void 0 ? _h : 0) > 0) {
                (_j = isExits === null || isExits === void 0 ? void 0 : isExits.galleries) === null || _j === void 0 ? void 0 : _j.forEach((image) => {
                    (0, deleteFile_1.deleteFile)(`./uploads/${image}`);
                });
            }
        }
    }
    catch (error) {
        if ((newGalleries === null || newGalleries === void 0 ? void 0 : newGalleries.length) > 0) {
            newGalleries === null || newGalleries === void 0 ? void 0 : newGalleries.forEach((gallery) => {
                (0, deleteFile_1.deleteFile)(`./uploads/product/${gallery}`);
            });
        }
        if (thumbnail) {
            (0, deleteFile_1.deleteFile)(`./uploads/product/${thumbnail}`);
        }
        if (productManual) {
            (0, deleteFile_1.deleteFile)(`./uploads/product/${productManual}`);
        }
        variantImages.forEach((img) => (0, deleteFile_1.deleteFile)(`./uploads/product/${img.filename}`));
        return next(error);
    }
}));
exports.deleteProductController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield (0, productService_1.deleteProductService)(id);
    res.status(200).json({
        success: true,
        message: 'Product deleted successfully',
    });
}));
exports.trueProductIsShowController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, productService_1.trueProductIsShowService)(req.params.id);
    res.status(200).json({
        success: true,
        message: 'Product update successfully',
        data: result,
    });
}));
exports.updateProductFeatureController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, productService_1.updateProductFeatureService)(req.params.id);
    res.status(200).json({
        success: true,
        message: 'Product feature update successfully',
        data: result,
    });
}));
