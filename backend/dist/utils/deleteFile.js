"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFile = void 0;
/* eslint-disable no-console */
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const deleteFile = (filePath) => {
    const fullPath = path_1.default.join(process.cwd(), filePath);
    fs_1.default.unlink(fullPath, (err) => {
        if (err) {
            console.error(`Error deleting file: ${fullPath}`, err);
        }
        else {
            console.log(`File deleted: ${fullPath}`);
        }
    });
};
exports.deleteFile = deleteFile;
