"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserChangeSchema = exports.UserEmailLoginSchema = exports.UserLoginSchema = exports.UserCreateSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.UserCreateSchema = joi_1.default.object({
    email: joi_1.default.string().email().min(10).required(),
    password: joi_1.default.string().min(8).required(),
    name: joi_1.default.string().min(8).required(),
    phone: joi_1.default.string().min(10).required(),
    role: joi_1.default.string(),
});
exports.UserLoginSchema = joi_1.default.object({
    email: joi_1.default.string().email().min(10).required(),
    password: joi_1.default.string().min(8).required(),
});
exports.UserEmailLoginSchema = joi_1.default.object({
    email: joi_1.default.string().email().min(10).required(),
    password: joi_1.default.string().min(8).required(),
});
exports.UserChangeSchema = joi_1.default.object({
    oldpassword: joi_1.default.string().min(8).required(),
    newpassword: joi_1.default.string().min(8).required(),
    renewpassword: joi_1.default.string().min(8).required(),
});
