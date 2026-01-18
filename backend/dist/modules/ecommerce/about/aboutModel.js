"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.About = void 0;
const mongoose_1 = require("mongoose");
const aboutSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    subTitle: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    highlightTitle: {
        type: String,
    },
    highlightSubTitle: {
        type: String,
    },
    videoUrl: {
        type: String,
    },
    testimonial: {
        name: {
            type: String,
        },
        role: {
            type: String,
        },
        message: {
            type: String,
        },
        image: {
            type: String,
        },
    },
    testimonials: [
        {
            name: {
                type: String,
            },
            role: {
                type: String,
            },
            message: {
                type: String,
            },
            image: {
                type: String,
            },
        },
    ],
    whatWeDo: {
        title: {
            type: String,
        },
        description: {
            type: String,
        },
    },
    whoWeServe: {
        title: {
            type: String,
        },
        description: {
            type: String,
        },
    },
    ourVision: {
        title: {
            type: String,
        },
        description: {
            type: String,
        },
    },
});
exports.About = (0, mongoose_1.model)('About', aboutSchema);
