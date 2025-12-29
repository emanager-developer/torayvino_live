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
exports.SubCategory = void 0;
const mongoose_1 = require("mongoose");
const subSubCategoryModel_1 = require("../subSubCategory/subSubCategoryModel");
const mongoose_2 = __importDefault(require("mongoose"));
const subCategorySchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Category', required: true },
    subSubCategories: [
        {
            type: mongoose_2.default.Types.ObjectId,
            ref: "SubSubCategory",
        },
    ],
});
subCategorySchema.pre('findOneAndDelete', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const subCategoryId = this.getQuery()['_id'];
        const subSubCategoryCount = yield subSubCategoryModel_1.SubSubCategory.countDocuments({
            subCategory: subCategoryId,
        });
        if (subSubCategoryCount > 0) {
            const err = new Error('Cannot delete subcategory with existing sub-subcategories');
            err.statusCode = 400;
            return next(err);
        }
        next();
    });
});
exports.SubCategory = (0, mongoose_1.model)('SubCategory', subCategorySchema);
