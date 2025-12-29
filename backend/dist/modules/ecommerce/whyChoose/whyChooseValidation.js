"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateWhyChooseValidation = exports.whyChooseValidation = void 0;
const zod_1 = require("zod");
exports.whyChooseValidation = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Title is required'),
    description: zod_1.z.string().min(1, 'Description is required'),
    points: zod_1.z.array(zod_1.z.object({
        title: zod_1.z.string().min(1, 'Title is required'),
        description: zod_1.z.string().min(1, 'Description is required'),
        image: zod_1.z.string().optional(),
        hasNewImage: zod_1.z.boolean().optional(),
    })),
});
exports.updateWhyChooseValidation = exports.whyChooseValidation.partial();
