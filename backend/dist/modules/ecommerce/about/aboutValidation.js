"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAboutValidation = exports.aboutValidation = void 0;
const zod_1 = require("zod");
const sectionValidation = zod_1.z.object({
    title: zod_1.z.string({ required_error: 'Title is required.' }).min(1),
    description: zod_1.z.string({ required_error: 'Description is required.' }).min(1),
});
const testimonialValidation = zod_1.z.object({
    _id: zod_1.z.string().optional(),
    name: zod_1.z.string({ required_error: 'Name is required.' }).min(1),
    role: zod_1.z.string().optional(),
    message: zod_1.z.string({ required_error: 'Message is required.' }).min(1),
    image: zod_1.z.string().optional(),
});
const testimonialsArray = (itemSchema) => zod_1.z.preprocess((value) => {
    if (value === undefined || value === null)
        return value;
    if (Array.isArray(value))
        return value;
    if (typeof value === 'object')
        return Object.values(value);
    return value;
}, zod_1.z.array(itemSchema, { invalid_type_error: 'Testimonials must be an array.' }));
exports.aboutValidation = zod_1.z.object({
    title: zod_1.z.string({ required_error: 'Title is required.' }),
    subTitle: zod_1.z.string({ required_error: 'SubTitle is required.' }),
    description: zod_1.z.string({ required_error: 'Description is required.' }),
    highlightTitle: zod_1.z.string().optional(),
    highlightSubTitle: zod_1.z.string().optional(),
    videoUrl: zod_1.z.string().optional(),
    testimonial: testimonialValidation.optional(),
    testimonials: testimonialsArray(testimonialValidation).optional(),
    whatWeDo: sectionValidation.optional(),
    whoWeServe: sectionValidation.optional(),
    ourVision: sectionValidation.optional(),
});
exports.updateAboutValidation = zod_1.z.object({
    title: zod_1.z.string().optional(),
    subTitle: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    highlightTitle: zod_1.z.string().optional(),
    highlightSubTitle: zod_1.z.string().optional(),
    videoUrl: zod_1.z.string().optional(),
    testimonial: testimonialValidation.partial().optional(),
    testimonials: testimonialsArray(testimonialValidation.partial()).optional(),
    whatWeDo: sectionValidation.partial().optional(),
    whoWeServe: sectionValidation.partial().optional(),
    ourVision: sectionValidation.partial().optional(),
});
