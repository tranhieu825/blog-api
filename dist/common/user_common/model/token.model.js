"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = exports.TokenSchemaName = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.TokenSchemaName = "Token";
const TokenSchema = new mongoose_1.default.Schema({
    accessToken: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    expire_access: {
        type: String,
        required: true,
        default: "7d",
    },
    expire_refresh: {
        type: String,
        required: true,
        default: "14d",
    },
}, {
    timestamps: true,
});
exports.Token = mongoose_1.default.model(exports.TokenSchemaName, TokenSchema);
