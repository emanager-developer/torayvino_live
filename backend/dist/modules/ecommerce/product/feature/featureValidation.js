"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFeatureValidation = exports.featureValidation = void 0;
const zod_1 = require("zod");
exports.featureValidation = zod_1.z.object({
    name: zod_1.z.string({ required_error: 'Name is required.' }),
    order: zod_1.z.number().min(1),
    image: zod_1.z.string({ required_error: 'Image is required.' }),
    description: zod_1.z.string().optional(),
});
exports.updateFeatureValidation = exports.featureValidation.partial();
