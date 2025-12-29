"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateContactValidation = exports.contactValidation = void 0;
const zod_1 = require("zod");
exports.contactValidation = zod_1.z.object({});
exports.updateContactValidation = exports.contactValidation.partial();
