"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubSubCategory = void 0;
const mongoose_1 = require("mongoose");
const subSubCategorySchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Category', required: true },
    subCategory: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'SubCategory',
        required: true,
    },
});
exports.SubSubCategory = (0, mongoose_1.model)('SubSubCategory', subSubCategorySchema);
