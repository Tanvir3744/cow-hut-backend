"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleCastError = (err) => {
    const errors = [
        {
            path: err === null || err === void 0 ? void 0 : err.path,
            message: err === null || err === void 0 ? void 0 : err.message,
        }
    ];
    const statusCode = 400;
    return {
        statusCode,
        message: 'Cast Error (this is appearing for wrong id)',
        errorMessages: errors,
    };
};
exports.default = handleCastError;
