"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleValidationError = (err) => {
    const errors = Object.values(err.errors).map(elem => {
        return { path: elem === null || elem === void 0 ? void 0 : elem.path, message: elem === null || elem === void 0 ? void 0 : elem.message };
    });
    const statusCode = 400;
    return {
        statusCode,
        message: 'Validation Error',
        errorMessages: errors
    };
};
exports.default = handleValidationError;
