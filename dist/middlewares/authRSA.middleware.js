"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decryptRegister = exports.encryptRegister = void 0;
const crypto_1 = __importDefault(require("crypto"));
const env_1 = require("../config/env");
function encryptRegister(text) {
    const algorithm = env_1.RSA_ALGORITHM;
    const password = env_1.RSA_PASSWORD;
    const iv = env_1.RSA_IV;
    const cipher = crypto_1.default.createCipheriv(algorithm, password, iv);
    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");
    const tag = cipher.getAuthTag();
    return {
        content: encrypted,
        tag: tag,
    };
}
exports.encryptRegister = encryptRegister;
function decryptRegister(encrypted) {
    const algorithm = env_1.RSA_ALGORITHM;
    const password = env_1.RSA_PASSWORD;
    const iv = env_1.RSA_IV;
    let decipher = crypto_1.default.createDecipheriv(algorithm, password, iv);
    decipher.setAuthTag(encrypted.tag);
    let dec = decipher.update(encrypted.content, "hex", "utf8");
    dec += decipher.final("utf8");
    return dec;
}
exports.decryptRegister = decryptRegister;
