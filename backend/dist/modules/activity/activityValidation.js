"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateActivityValidation = exports.activityValidation = void 0;
const zod_1 = require("zod");
exports.activityValidation = zod_1.z.object({
    start: zod_1.z.string().min(1, { message: 'Date is required' }),
    end: zod_1.z.string().min(1, { message: 'Date is required' }),
    title: zod_1.z.string().min(1, { message: 'Title is required' }),
    addedBy: zod_1.z.string().min(1, { message: 'User Id is required' }),
});
exports.updateActivityValidation = exports.activityValidation.partial();
