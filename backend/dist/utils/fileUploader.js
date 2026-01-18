"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileUploader = void 0;
const multerUploader_1 = require("./multerUploader");
const fileUploader = (uploadPath) => {
    return (0, multerUploader_1.createUploader)({
        uploadSubdir: uploadPath,
    });
};
exports.fileUploader = fileUploader;
