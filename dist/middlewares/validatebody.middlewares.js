"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commonValidateBody = void 0;
const joi_1 = require("joi");
//import * as joi from "joi";
function commonValidateBody(schema) {
    return (req, res, next) => {
        const value = req['body'];
        return joi_1.validate(value, schema)
            .then(() => {
            return next();
        })
            .catch((errors) => {
            const firstError = errors.details[0];
            const error = {
                code: firstError.type,
                message: firstError.message,
            };
            return res.json(error);
        });
    };
}
exports.commonValidateBody = commonValidateBody;
