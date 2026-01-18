"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUploader = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const crypto_1 = __importDefault(require("crypto"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const upload_1 = require("../config/upload");
const ensureUploadDir = (uploadSubdir) => {
    const dir = path_1.default.join(process.cwd(), 'uploads', uploadSubdir);
    if (!fs_1.default.existsSync(dir)) {
        fs_1.default.mkdirSync(dir, { recursive: true });
    }
    return dir;
};
const safeFilename = (name) => {
    const base = path_1.default.basename(name);
    return base.replace(/[^a-zA-Z0-9._-]/g, '_');
};
const makeStorage = (uploadSubdir) => {
    const dest = ensureUploadDir(uploadSubdir);
    return multer_1.default.diskStorage({
        destination: function (_req, _file, cb) {
            cb(null, dest);
        },
        filename: function (_req, file, cb) {
            const rand = crypto_1.default.randomBytes(6).toString('hex');
            cb(null, `${Date.now()}-${rand}-${safeFilename(file.originalname)}`);
        },
    });
};
const isAllowed = (mimetype, allowed) => {
    if (allowed.includes('image') && mimetype.startsWith('image/'))
        return true;
    if (allowed.includes('pdf') && mimetype === 'application/pdf')
        return true;
    return false;
};
const createUploader = ({ uploadSubdir, rules, limits }) => {
    var _a, _b;
    const ruleMap = new Map();
    (rules || []).forEach((r) => ruleMap.set(r.fieldName, r));
    return (0, multer_1.default)({
        storage: makeStorage(uploadSubdir),
        limits: {
            fileSize: (_a = limits === null || limits === void 0 ? void 0 : limits.fileSize) !== null && _a !== void 0 ? _a : upload_1.uploadConfig.maxFileSizeBytes,
            files: (_b = limits === null || limits === void 0 ? void 0 : limits.files) !== null && _b !== void 0 ? _b : upload_1.uploadConfig.maxFiles,
        },
        fileFilter: (req, file, cb) => {
            const rule = ruleMap.get(file.fieldname);
            // If no rule specified for the field, allow it (keeps backward compatibility)
            if (!rule)
                return cb(null, true);
            if (isAllowed(file.mimetype, rule.allowed)) {
                return cb(null, true);
            }
            const expected = rule.allowed.join(' or ').toUpperCase();
            return cb(new AppError_1.default(http_status_1.default.BAD_REQUEST, `Invalid file type for ${rule.fieldName}. Allowed: ${expected}`));
        },
    });
};
exports.createUploader = createUploader;
