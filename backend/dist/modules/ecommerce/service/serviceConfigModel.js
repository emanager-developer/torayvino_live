"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceConfig = void 0;
const mongoose_1 = require("mongoose");
const serviceConfigSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    service: { type: [String], required: true },
    charge: { type: [Number], required: true },
});
exports.ServiceConfig = (0, mongoose_1.model)('ServiceConfig', serviceConfigSchema);
