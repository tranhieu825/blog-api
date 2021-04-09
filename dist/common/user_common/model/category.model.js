"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = exports.CategorySchemaName = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const common_model_1 = require("./common.model");
exports.CategorySchemaName = "Category";
const CategorySchema = new mongoose_1.default.Schema(common_model_1.SchemaBase({
    title: {
        type: String,
        required: true,
    },
    user_id: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' }]
}));
exports.Category = mongoose_1.default.model(exports.CategorySchemaName, CategorySchema);
