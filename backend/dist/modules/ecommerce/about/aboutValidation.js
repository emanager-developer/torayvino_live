"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAboutValidation = exports.aboutValidation = void 0;
const zod_1 = require("zod");
exports.aboutValidation = zod_1.z.object({
    title: zod_1.z.string({ required_error: 'Title is required.' }),
    subTitle: zod_1.z.string({ required_error: 'SubTitle is required.' }),
    description: zod_1.z.string({ required_error: 'Description is required.' }),
});
exports.updateAboutValidation = exports.aboutValidation.partial();
