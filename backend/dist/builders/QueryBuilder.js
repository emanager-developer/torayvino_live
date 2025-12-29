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
class QueryBuilder {
    constructor(modelQuery, query) {
        this.modelQuery = modelQuery;
        this.query = query;
    }
    // Search by specific fields (e.g., title or content)
    search(searchableFields) {
        var _a;
        const search = (_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.search;
        if (search) {
            // Escape regex metacharacters so user input is treated literally
            const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const q = String(search).trim();
            if (q.length > 0) {
                const escaped = escapeRegex(q);
                this.modelQuery = this.modelQuery.find({
                    $or: searchableFields.map((field) => ({
                        [field]: { $regex: escaped, $options: 'i' },
                    })),
                });
            }
        }
        return this;
    }
    filter() {
        const queryObj = Object.assign({}, this.query);
        // Fields to exclude from filter
        const excludeFields = [
            'search',
            'sort',
            'limit',
            'page',
            'fields',
            'startDate',
            'endDate',
            'userInvolved',
        ];
        excludeFields.forEach((el) => delete queryObj[el]);
        const finalFilter = {};
        for (const key in queryObj) {
            const value = queryObj[key];
            if (value === '' ||
                value === null ||
                value === undefined ||
                value === 'null') {
                continue;
            }
            if (key.endsWith('_ne')) {
                const actualKey = key.replace('_ne', '');
                finalFilter[actualKey] = { $ne: value };
            }
            else {
                finalFilter[key] = value;
            }
        }
        const { startDate, endDate } = this.query;
        if (startDate || endDate) {
            finalFilter.date = {};
            if (startDate) {
                const start = new Date(startDate);
                start.setUTCHours(0, 0, 0, 0);
                finalFilter.date.$gte = start;
            }
            if (endDate) {
                const end = new Date(endDate);
                end.setUTCHours(23, 59, 59, 999);
                finalFilter.date.$lte = end;
            }
        }
        if (this.query.userInvolved) {
            const userId = this.query.userInvolved;
            finalFilter.$or = [{ assignedBy: userId }, { assignedTo: userId }];
        }
        // Merge with any existing filter on the query (so callers can pass a base filter)
        const existingFilter = (this.modelQuery.getFilter && this.modelQuery.getFilter()) || {};
        const mergedFilter = Object.assign(Object.assign({}, existingFilter), finalFilter);
        this.modelQuery = this.modelQuery.find(mergedFilter);
        return this;
    }
    // Sort by a specific field and order
    sort() {
        var _a, _b, _c;
        const sort = ((_c = (_b = (_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.sort) === null || _b === void 0 ? void 0 : _b.split(',')) === null || _c === void 0 ? void 0 : _c.join(' ')) ||
            '-date -createdAt';
        this.modelQuery = this.modelQuery.sort(sort);
        return this;
    }
    // Pagination
    paginate() {
        const page = Number(this.query.page) || 1;
        const limit = Number(this.query.limit);
        const skip = limit ? (page - 1) * limit : 0;
        this.modelQuery = this.modelQuery.skip(skip).limit(limit);
        return this;
    }
    // Select specific fields
    fields() {
        var _a, _b, _c;
        const fields = ((_c = (_b = (_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.fields) === null || _b === void 0 ? void 0 : _b.split(',')) === null || _c === void 0 ? void 0 : _c.join(' ')) || '-__v';
        this.modelQuery = this.modelQuery.select(fields);
        return this;
    }
    // Count total documents
    countTotal() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const totalQueries = this.modelQuery.getFilter();
            const total = yield this.modelQuery.model.countDocuments(totalQueries);
            const page = Number((_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.page) || 1;
            const limit = Number((_b = this === null || this === void 0 ? void 0 : this.query) === null || _b === void 0 ? void 0 : _b.limit);
            const pages = limit ? Math.ceil(total / limit) : Math.ceil(total / 0);
            return {
                page,
                limit,
                total,
                pages,
            };
        });
    }
}
exports.default = QueryBuilder;
