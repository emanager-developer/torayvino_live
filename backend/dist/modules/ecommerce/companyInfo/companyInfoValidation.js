"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCompanyInfoValidation = exports.companyInfoValidation = void 0;
const zod_1 = require("zod");
exports.companyInfoValidation = zod_1.z.object({});
exports.updateCompanyInfoValidation = exports.companyInfoValidation.partial();
