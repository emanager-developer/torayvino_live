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
exports.removeProductFromOfferService = exports.addProductToOfferService = exports.toggleOfferStatusService = exports.deleteOfferService = exports.updateOfferService = exports.getBySlugOfferService = exports.getByIdOfferService = exports.getActiveOffersService = exports.getAllOfferService = exports.createOfferService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const offerModel_1 = require("./offerModel");
const QueryBuilder_1 = __importDefault(require("../../../../builders/QueryBuilder"));
const AppError_1 = __importDefault(require("../../../../errors/AppError"));
const deleteFile_1 = require("../../../../utils/deleteFile");
const createOfferService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield offerModel_1.Offer.create(data);
    return result;
});
exports.createOfferService = createOfferService;
const getAllOfferService = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const OfferQuery = new QueryBuilder_1.default(offerModel_1.Offer.find().populate('products', 'title slug thumbnail price discount stock'), query)
        .search(['name', 'description'])
        .filter()
        .sort()
        .paginate()
        .fields();
    const meta = yield OfferQuery.countTotal();
    const data = yield OfferQuery.modelQuery;
    return {
        meta,
        data,
    };
});
exports.getAllOfferService = getAllOfferService;
const getActiveOffersService = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const currentDate = new Date();
    const OfferQuery = new QueryBuilder_1.default(offerModel_1.Offer.find({
        isActive: true,
        $and: [
            {
                $or: [
                    { startDate: { $exists: false } },
                    { startDate: { $lte: currentDate } },
                ],
            },
            {
                $or: [
                    { endDate: { $exists: false } },
                    { endDate: { $gte: currentDate } },
                ],
            },
        ],
    }).populate('products', 'title slug thumbnail price discount stock'), query)
        .search(['name', 'description'])
        .filter()
        .sort()
        .paginate()
        .fields();
    const meta = yield OfferQuery.countTotal();
    const data = yield OfferQuery.modelQuery;
    return {
        meta,
        data,
    };
});
exports.getActiveOffersService = getActiveOffersService;
const getByIdOfferService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield offerModel_1.Offer.findById(id).populate('products', 'title slug thumbnail price discount stock description category');
    return result;
});
exports.getByIdOfferService = getByIdOfferService;
const getBySlugOfferService = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield offerModel_1.Offer.findOne({ slug }).populate('products', 'title slug thumbnail price discount stock description category');
    return result;
});
exports.getBySlugOfferService = getBySlugOfferService;
const updateOfferService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield offerModel_1.Offer.findById(id);
    if (!isExist)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Offer not found');
    const result = yield offerModel_1.Offer.findByIdAndUpdate(id, data, { new: true });
    return result;
});
exports.updateOfferService = updateOfferService;
const deleteOfferService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    const isExist = yield offerModel_1.Offer.findById(id);
    if (!isExist)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Offer not found');
    const result = yield offerModel_1.Offer.findByIdAndDelete(id);
    if (result) {
        // Delete thumbnail
        (0, deleteFile_1.deleteFile)(`./uploads/${isExist === null || isExist === void 0 ? void 0 : isExist.thumbnail}`);
        // Delete desktop banner images
        if (((_c = (_b = (_a = isExist === null || isExist === void 0 ? void 0 : isExist.banners) === null || _a === void 0 ? void 0 : _a.desktop) === null || _b === void 0 ? void 0 : _b.length) !== null && _c !== void 0 ? _c : 0) > 0) {
            (_e = (_d = isExist === null || isExist === void 0 ? void 0 : isExist.banners) === null || _d === void 0 ? void 0 : _d.desktop) === null || _e === void 0 ? void 0 : _e.forEach((banner) => {
                (0, deleteFile_1.deleteFile)(`./uploads/${banner}`);
            });
        }
        // Delete mobile banner images
        if (((_h = (_g = (_f = isExist === null || isExist === void 0 ? void 0 : isExist.banners) === null || _f === void 0 ? void 0 : _f.mobile) === null || _g === void 0 ? void 0 : _g.length) !== null && _h !== void 0 ? _h : 0) > 0) {
            (_k = (_j = isExist === null || isExist === void 0 ? void 0 : isExist.banners) === null || _j === void 0 ? void 0 : _j.mobile) === null || _k === void 0 ? void 0 : _k.forEach((banner) => {
                (0, deleteFile_1.deleteFile)(`./uploads/${banner}`);
            });
        }
    }
    return result;
});
exports.deleteOfferService = deleteOfferService;
const toggleOfferStatusService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield offerModel_1.Offer.findById(id);
    if (!isExist)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Offer not found');
    const result = yield offerModel_1.Offer.findByIdAndUpdate(id, { isActive: !isExist.isActive }, { new: true });
    return result;
});
exports.toggleOfferStatusService = toggleOfferStatusService;
const addProductToOfferService = (offerId, productId) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield offerModel_1.Offer.findById(offerId);
    if (!isExist)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Offer not found');
    if (isExist.products.includes(productId)) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Product already exists in this offer');
    }
    const result = yield offerModel_1.Offer.findByIdAndUpdate(offerId, { $push: { products: productId } }, { new: true });
    return result;
});
exports.addProductToOfferService = addProductToOfferService;
const removeProductFromOfferService = (offerId, productId) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield offerModel_1.Offer.findById(offerId);
    if (!isExist)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Offer not found');
    const result = yield offerModel_1.Offer.findByIdAndUpdate(offerId, { $pull: { products: productId } }, { new: true });
    return result;
});
exports.removeProductFromOfferService = removeProductFromOfferService;
