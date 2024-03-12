"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, data) => {
    const responseData = {
        statusCode: data.statusCode,
        success: data.success,
        message: data.message || null,
        data: (data === null || data === void 0 ? void 0 : data.data) || null,
        meta: data.meta /* || { page: 1, limit: 10, total: 0 } */, // Provide a default value
    };
    res.status(data.statusCode).json(responseData);
};
exports.default = sendResponse;
