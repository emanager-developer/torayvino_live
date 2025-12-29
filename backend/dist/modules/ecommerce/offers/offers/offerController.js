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
exports.removeProductFromOfferController = exports.addProductToOfferController = exports.toggleOfferStatusController = exports.deleteOfferController = exports.updateOfferController = exports.getBySlugOfferController = exports.getByIdOfferController = exports.getActiveOffersController = exports.getAllOfferController = exports.createOfferController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const offerService_1 = require("./offerService");
const catchAsync_1 = require("../../../../utils/catchAsync");
const AppError_1 = __importDefault(require("../../../../errors/AppError"));
const makeSlug_1 = require("../../../../utils/makeSlug");
const deleteFile_1 = require("../../../../utils/deleteFile");
const sendResponse_1 = __importDefault(require("../../../../utils/sendResponse"));
exports.createOfferController = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const files = req.files;
    if (!files.thumbnail || files.thumbnail.length === 0) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Thumbnail is required');
    }
    const thumbnail = files.thumbnail[0].filename;
    const desktopBanners = files.desktopBanners ? files.desktopBanners.map((f) => f.filename) : [];
    const mobileBanners = files.mobileBanners ? files.mobileBanners.map((f) => f.filename) : [];
    try {
        const { name, description, products, isActive, startDate, endDate, discountPercentage, priority } = req.body;
        if (!name) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Offer name is required');
        }
        const offer = {
            name,
            slug: (0, makeSlug_1.makeSlug)(name),
            description: description || '',
            thumbnail: `/offers/${thumbnail}`,
            banners: {
                desktop: (desktopBanners === null || desktopBanners === void 0 ? void 0 : desktopBanners.length) > 0
                    ? desktopBanners.map((banner) => `/offers/${banner}`)
                    : [],
                mobile: (mobileBanners === null || mobileBanners === void 0 ? void 0 : mobileBanners.length) > 0
                    ? mobileBanners.map((banner) => `/offers/${banner}`)
                    : [],
            },
            products: products ? (Array.isArray(products) ? products : [products]) : [],
            isActive: isActive !== undefined ? isActive : true,
            startDate: startDate ? new Date(startDate) : undefined,
            endDate: endDate ? new Date(endDate) : undefined,
            discountPercentage: discountPercentage ? Number(discountPercentage) : undefined,
            priority: priority ? Number(priority) : 0,
        };
        const result = yield (0, offerService_1.createOfferService)(offer);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.CREATED,
            success: true,
            message: 'Offer created successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
        // Clean up uploaded files if error occurs
        if (thumbnail)
            (0, deleteFile_1.deleteFile)(`./uploads/offers/${thumbnail}`);
        if ((desktopBanners === null || desktopBanners === void 0 ? void 0 : desktopBanners.length) > 0) {
            desktopBanners.forEach((banner) => {
                (0, deleteFile_1.deleteFile)(`./uploads/offers/${banner}`);
            });
        }
        if ((mobileBanners === null || mobileBanners === void 0 ? void 0 : mobileBanners.length) > 0) {
            mobileBanners.forEach((banner) => {
                (0, deleteFile_1.deleteFile)(`./uploads/offers/${banner}`);
            });
        }
    }
}));
exports.getAllOfferController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, offerService_1.getAllOfferService)(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Offers retrieved successfully',
        meta: result.meta,
        data: result.data,
    });
}));
exports.getActiveOffersController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, offerService_1.getActiveOffersService)(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Active offers retrieved successfully',
        meta: result.meta,
        data: result.data,
    });
}));
exports.getByIdOfferController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield (0, offerService_1.getByIdOfferService)(id);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Offer not found');
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Offer retrieved successfully',
        data: result,
    });
}));
exports.getBySlugOfferController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { slug } = req.params;
    const result = yield (0, offerService_1.getBySlugOfferService)(slug);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Offer not found');
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Offer retrieved successfully',
        data: result,
    });
}));
exports.updateOfferController = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const files = req.files;
    try {
        const updateData = Object.assign({}, req.body);
        // Handle new thumbnail upload
        if (files.thumbnail && files.thumbnail.length > 0) {
            updateData.thumbnail = `/offers/${files.thumbnail[0].filename}`;
        }
        // Handle new banner uploads
        if (files.desktopBanners && files.desktopBanners.length > 0) {
            const newDesktopBanners = files.desktopBanners.map((f) => `/offers/${f.filename}`);
            if (!updateData.banners)
                updateData.banners = {};
            updateData.banners.desktop = updateData.banners.desktop
                ? [...updateData.banners.desktop, ...newDesktopBanners]
                : newDesktopBanners;
        }
        if (files.mobileBanners && files.mobileBanners.length > 0) {
            const newMobileBanners = files.mobileBanners.map((f) => `/offers/${f.filename}`);
            if (!updateData.banners)
                updateData.banners = {};
            updateData.banners.mobile = updateData.banners.mobile
                ? [...updateData.banners.mobile, ...newMobileBanners]
                : newMobileBanners;
        }
        // Update slug if name changed
        if (updateData.name) {
            updateData.slug = (0, makeSlug_1.makeSlug)(updateData.name);
        }
        // Handle date fields
        if (updateData.startDate) {
            updateData.startDate = new Date(updateData.startDate);
        }
        if (updateData.endDate) {
            updateData.endDate = new Date(updateData.endDate);
        }
        // Handle numeric fields
        if (updateData.discountPercentage) {
            updateData.discountPercentage = Number(updateData.discountPercentage);
        }
        if (updateData.priority) {
            updateData.priority = Number(updateData.priority);
        }
        // Handle products array
        if (updateData.products) {
            updateData.products = Array.isArray(updateData.products) ? updateData.products : [updateData.products];
        }
        const result = yield (0, offerService_1.updateOfferService)(id, updateData);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Offer updated successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
        // Clean up uploaded files if error occurs
        if (files.thumbnail && files.thumbnail.length > 0) {
            (0, deleteFile_1.deleteFile)(`./uploads/offers/${files.thumbnail[0].filename}`);
        }
        if (files.desktopBanners && files.desktopBanners.length > 0) {
            files.desktopBanners.forEach((banner) => {
                (0, deleteFile_1.deleteFile)(`./uploads/offers/${banner.filename}`);
            });
        }
        if (files.mobileBanners && files.mobileBanners.length > 0) {
            files.mobileBanners.forEach((banner) => {
                (0, deleteFile_1.deleteFile)(`./uploads/offers/${banner.filename}`);
            });
        }
    }
}));
exports.deleteOfferController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield (0, offerService_1.deleteOfferService)(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Offer deleted successfully',
        data: result,
    });
}));
exports.toggleOfferStatusController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield (0, offerService_1.toggleOfferStatusService)(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: `Offer ${(result === null || result === void 0 ? void 0 : result.isActive) ? 'activated' : 'deactivated'} successfully`,
        data: result,
    });
}));
exports.addProductToOfferController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { offerId, productId } = req.params;
    const result = yield (0, offerService_1.addProductToOfferService)(offerId, productId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Product added to offer successfully',
        data: result,
    });
}));
exports.removeProductFromOfferController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { offerId, productId } = req.params;
    const result = yield (0, offerService_1.removeProductFromOfferService)(offerId, productId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Product removed from offer successfully',
        data: result,
    });
}));
