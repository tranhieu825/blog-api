"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Categorypost = exports.CategorypostSchemaName = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const common_model_1 = require("./common.model");
exports.CategorypostSchemaName = "Categorypost";
const CategorypostSchema = new mongoose_1.default.Schema(common_model_1.SchemaBase({
    title: {
        type: String,
        required: true,
    },
    parent: {
        type: String,
        required: true,
    },
    category_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "category"
    },
    post_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "post"
    },
}), {
    timestamps: true,
});
exports.Categorypost = mongoose_1.default.model(exports.CategorypostSchemaName, CategorypostSchema);
