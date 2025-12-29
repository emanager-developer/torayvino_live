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
exports.updateReviewService = exports.deleteReviewService = exports.getAllReviewService = exports.addReviewService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const AppError_1 = __importDefault(require("../../../errors/AppError"));
const customerModel_1 = require("../../customer/customerModel");
const productModel_1 = require("../product/product/productModel");
const reviewModel_1 = require("./reviewModel");
const http_status_1 = __importDefault(require("http-status"));
const QueryBuilder_1 = __importDefault(require("../../../builders/QueryBuilder"));
const addReviewService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { product, customer, rating } = data;
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        // -----------------check product-----------------
        const isExistProduct = yield productModel_1.Product.findById(product).session(session);
        if (!isExistProduct) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Product not found');
        }
        // -----------------check customer----------------
        const isExistCustomer = yield customerModel_1.Customer.findById(customer).session(session);
        if (!isExistCustomer) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Customer not found');
        }
        // -----------------calculate new rating-----------
        const totalRating = isExistProduct.rating
            ? isExistProduct.rating * isExistProduct.reviewer + rating
            : rating;
        const totalReviewer = isExistProduct.reviewer
            ? isExistProduct.reviewer + 1
            : 1;
        const newRating = (totalRating / totalReviewer).toFixed(1);
        // -----------------update product----------------
        yield productModel_1.Product.findByIdAndUpdate(product, {
            $set: {
                rating: newRating,
                reviewer: totalReviewer,
            },
        }, { new: true, session });
        // -----------------create review-----------------
        const review = yield reviewModel_1.Review.create([Object.assign({}, data)], { session });
        yield session.commitTransaction();
        session.endSession();
        return review[0];
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
});
exports.addReviewService = addReviewService;
const getAllReviewService = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const reviewQuery = new QueryBuilder_1.default(reviewModel_1.Review.find().populate('customer product', 'name phone thumbnail'), query)
        .search([])
        .filter()
        .sort()
        .paginate()
        .fields();
    const meta = yield reviewQuery.countTotal();
    const data = yield reviewQuery.modelQuery;
    return {
        meta,
        data,
    };
});
exports.getAllReviewService = getAllReviewService;
const deleteReviewService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { customer } = data;
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const review = yield reviewModel_1.Review.findById(id).session(session);
        if (!review) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Review not found');
        }
        if (review.customer.toString() !== customer) {
            throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'You are not allowed to delete this review');
        }
        //   update product rating, reviewer
        const product = yield productModel_1.Product.findOne({ _id: review === null || review === void 0 ? void 0 : review.product });
        const rating = (_a = product === null || product === void 0 ? void 0 : product.rating) !== null && _a !== void 0 ? _a : 0;
        const reviewer = (_b = product === null || product === void 0 ? void 0 : product.reviewer) !== null && _b !== void 0 ? _b : 0;
        const totalRating = rating * reviewer - (review === null || review === void 0 ? void 0 : review.rating);
        const totalReviewer = reviewer - 1;
        const newRating = totalReviewer
            ? Number((totalRating / totalReviewer).toFixed(1))
            : 0;
        yield productModel_1.Product.findOneAndUpdate({ _id: review === null || review === void 0 ? void 0 : review.product }, {
            $set: {
                rating: newRating,
                reviewer: totalReviewer,
            },
        }, { new: true, session });
        yield reviewModel_1.Review.findByIdAndDelete(id).session(session);
        yield session.commitTransaction();
        session.endSession();
        return {
            success: true,
            message: 'Review deleted successfully',
        };
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
});
exports.deleteReviewService = deleteReviewService;
const updateReviewService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const { customer } = data;
        const review = yield reviewModel_1.Review.findById(id).session(session);
        if (!review) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Review not found');
        }
        if (review.customer.toString() !== customer) {
            throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'You are not allowed to delete this review');
        }
        const product = yield productModel_1.Product.findById(review.product).session(session);
        if (!product) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Product not found');
        }
        // ---------- recalc product rating ----------
        const totalRating = product.rating * product.reviewer - review.rating + data.rating;
        const totalReviewer = product.reviewer;
        const newRating = totalReviewer
            ? Number((totalRating / totalReviewer).toFixed(1))
            : 0;
        yield productModel_1.Product.findByIdAndUpdate(review.product, {
            $set: {
                rating: newRating,
                reviewer: totalReviewer,
            },
        }, { new: true, session });
        // ---------- update review ----------
        const updatedReview = yield reviewModel_1.Review.findByIdAndUpdate(id, { $set: data }, { new: true, session });
        yield session.commitTransaction();
        session.endSession();
        return {
            success: true,
            message: 'Review updated successfully',
            data: updatedReview,
        };
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
});
exports.updateReviewService = updateReviewService;
