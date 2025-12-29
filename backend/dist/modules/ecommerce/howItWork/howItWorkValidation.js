"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateHowItWorkValidation = exports.howItWorkValidation = void 0;
const zod_1 = require("zod");
exports.howItWorkValidation = zod_1.z.object({
    title: zod_1.z.string({ required_error: 'Title is required.' }),
    description: zod_1.z.string({ required_error: 'Description is required.' }),
    order: zod_1.z.number().min(1),
});
exports.updateHowItWorkValidation = exports.howItWorkValidation.partial();
