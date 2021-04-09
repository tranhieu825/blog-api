"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.RoleCode = exports.UserSchemaName = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const common_model_1 = require("./common.model");
exports.UserSchemaName = "User";
var RoleCode;
(function (RoleCode) {
    RoleCode["Member"] = "member";
    RoleCode["Moderator"] = "moderator";
    RoleCode["Admin"] = "admin";
})(RoleCode = exports.RoleCode || (exports.RoleCode = {}));
const UserSchema = new mongoose_1.default.Schema(common_model_1.SchemaBase({
    name: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: [RoleCode.Admin, RoleCode.Member, RoleCode.Moderator],
        default: RoleCode.Member,
        required: true,
    },
    email: {
        type: String,
        required: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    },
    phone: {
        type: Number,
        required: true,
    },
    subject: {
        type: String,
    },
    message: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
}));
exports.User = mongoose_1.default.model(exports.UserSchemaName, UserSchema);
