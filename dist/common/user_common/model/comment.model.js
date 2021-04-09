"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = exports.CommentSchemaName = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const common_model_1 = require("./common.model");
exports.CommentSchemaName = "Comment";
const CommentSchema = new mongoose_1.default.Schema(common_model_1.SchemaBase({
    content: {
        type: String,
        required: true,
    },
    user_id: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "User"
        }],
    post_id: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Post"
        }],
}), {
    timestamps: true,
});
exports.Comment = mongoose_1.default.model(exports.CommentSchemaName, CommentSchema);
