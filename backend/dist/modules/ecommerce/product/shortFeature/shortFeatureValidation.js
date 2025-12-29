"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateShortFeatureValidation = exports.shortFeatureValidation = void 0;
const zod_1 = require("zod");
exports.shortFeatureValidation = zod_1.z.object({
    name: zod_1.z.string({ required_error: 'Name is required.' }),
    image: zod_1.z.string({ required_error: 'Image is required.' }),
});
exports.updateShortFeatureValidation = exports.shortFeatureValidation.partial();
