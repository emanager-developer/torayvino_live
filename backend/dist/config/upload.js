"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadConfig = void 0;
exports.uploadConfig = {
    maxFileSizeBytes: Number(process.env.UPLOAD_MAX_FILE_SIZE_BYTES || 10 * 1024 * 1024),
    maxFiles: Number(process.env.UPLOAD_MAX_FILES || 32),
};
