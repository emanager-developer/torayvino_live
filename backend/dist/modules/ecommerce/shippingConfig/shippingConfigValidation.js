"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateShippingConfigValidation = exports.shippingConfigValidation = void 0;
const zod_1 = require("zod");
exports.shippingConfigValidation = zod_1.z.object({
    area: zod_1.z.string().min(2).max(100),
    time: zod_1.z.string().min(2).max(100),
    charge: zod_1.z.number().min(0),
});
exports.updateShippingConfigValidation = exports.shippingConfigValidation.partial();
