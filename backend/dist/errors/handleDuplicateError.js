"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleDuplicateError = (err) => {
    const match = err.message.match(/"([^"]*)"/);
    // The extracted value will be in the first capturing group
    const extractedMessage = match && match[1];
    const message = `${extractedMessage} is already exists`;
    const errorSources = [{ path: '', message }];
    const statusCode = 400;
    return {
        statusCode,
        message: 'Duplicate Error',
        errorSources,
    };
};
exports.default = handleDuplicateError;
