"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = exports.success = void 0;
const success = (res, data, message, code, options) => {
    if (!res.headersSent) {
        res.status(code || 200);
        res.json({
            success: true,
            result: data,
            message,
            code: code || 200,
            options: options || null,
            error: null,
        });
    }
};
exports.success = success;
const error = (res, message, code, opts) => {
    const result = {
        success: false,
        result: null,
        message: message || "Error",
        code: code || 400,
        options: opts || null,
    };
    if ((!opts || !opts.loggingOnly) && !res.headersSent) {
        res.status(code || 400);
        res.json(result);
    }
};
exports.error = error;
