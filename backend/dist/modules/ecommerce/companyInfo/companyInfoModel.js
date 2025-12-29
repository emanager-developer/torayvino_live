"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyInfo = void 0;
const mongoose_1 = require("mongoose");
const companyInfoSchema = new mongoose_1.Schema({
    name: {
        type: String,
    },
    startYear: {
        type: Number,
    },
    type: {
        type: String,
    },
    bio: {
        type: String,
    },
});
exports.CompanyInfo = (0, mongoose_1.model)('CompanyInfo', companyInfoSchema);
