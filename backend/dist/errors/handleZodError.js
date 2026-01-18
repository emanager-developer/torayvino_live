"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const formatZodPath = (path) => {
    if (!(path === null || path === void 0 ? void 0 : path.length))
        return '';
    let out = '';
    for (const part of path) {
        if (typeof part === 'number') {
            out += `[${part}]`;
        }
        else {
            out += out ? `.${part}` : part;
        }
    }
    return out;
};
const handleZodError = (err) => {
    const errorSources = err.issues.map((issue) => {
        return {
            path: formatZodPath(issue.path),
            message: issue.message,
        };
    });
    const statusCode = 400;
    return {
        statusCode,
        message: 'Validation Error',
        errorSources,
    };
};
exports.default = handleZodError;
