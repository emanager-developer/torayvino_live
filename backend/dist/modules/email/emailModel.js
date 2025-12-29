"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Email = void 0;
const mongoose_1 = require("mongoose");
const emailSchema = new mongoose_1.Schema({
    host: {
        type: String,
        required: true,
    },
    port: {
        type: Number,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    pass: {
        type: String,
        required: true,
    },
});
exports.Email = (0, mongoose_1.model)('Email', emailSchema);
