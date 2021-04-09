"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = exports.PostSchemaName = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const common_model_1 = require("./common.model");
exports.PostSchemaName = "Post";
const PostSchema = new mongoose_1.default.Schema(common_model_1.SchemaBase({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    category_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Category"
    },
    view: {
        type: Number,
    },
    user_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User"
    },
}), {
    timestamps: true,
});
PostSchema.index({ "title": "text", "content": "text" });
exports.Post = mongoose_1.default.model(exports.PostSchemaName, PostSchema);
