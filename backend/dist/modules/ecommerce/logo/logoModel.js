"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logo = void 0;
const mongoose_1 = require("mongoose");
const logoSchema = new mongoose_1.Schema({
    logo: {
        type: String,
        required: true,
    },
});
exports.Logo = (0, mongoose_1.model)('Logo', logoSchema);
