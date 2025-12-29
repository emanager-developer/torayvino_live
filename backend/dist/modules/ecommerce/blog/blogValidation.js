"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogValidation = exports.blogValidation = void 0;
const zod_1 = require("zod");
exports.blogValidation = zod_1.z.object({
    title: zod_1.z.string({ required_error: 'Title is required.' }),
    description: zod_1.z.string({ required_error: 'Description is required.' }),
});
exports.updateBlogValidation = exports.blogValidation.partial();
