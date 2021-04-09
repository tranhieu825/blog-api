"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contact = exports.ContactSchemaName = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const common_model_1 = require("./common.model");
exports.ContactSchemaName = "Contact";
const ContactSchema = new mongoose_1.default.Schema(common_model_1.SchemaBase({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    user_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user"
    },
}));
exports.Contact = mongoose_1.default.model(exports.ContactSchemaName, ContactSchema);
