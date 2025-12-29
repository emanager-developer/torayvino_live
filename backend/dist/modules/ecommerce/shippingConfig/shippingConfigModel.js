"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShippingConfig = void 0;
const mongoose_1 = require("mongoose");
const shippingConfigSchema = new mongoose_1.Schema({
    area: { type: String, required: true },
    time: { type: String, required: true },
    charge: { type: Number, required: true },
});
exports.ShippingConfig = (0, mongoose_1.model)('ShippingConfig', shippingConfigSchema);
