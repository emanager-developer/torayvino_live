"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateServiceConfigValidation = exports.serviceConfigValidation = void 0;
const zod_1 = require("zod");
exports.serviceConfigValidation = zod_1.z.object({
    title: zod_1.z.string().min(2),
    service: zod_1.z.array(zod_1.z.string().min(1)).min(1),
    charge: zod_1.z.array(zod_1.z.number().min(0)).min(1),
});
exports.updateServiceConfigValidation = exports.serviceConfigValidation.partial();
