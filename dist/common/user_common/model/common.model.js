"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaBase = exports.StatusCode = exports.CommentSchemaName = exports.ContactSchemaName = exports.CategorypostSchemaName = exports.CategorySchemaName = exports.PostSchemaName = exports.UserSchemaName = void 0;
exports.UserSchemaName = "User";
exports.PostSchemaName = "Post";
exports.CategorySchemaName = "Category";
exports.CategorypostSchemaName = "Categorypost";
exports.ContactSchemaName = "Contact";
exports.CommentSchemaName = "Comment";
var StatusCode;
(function (StatusCode) {
    StatusCode["Active"] = "active";
    StatusCode["Deactive"] = "deactive";
})(StatusCode = exports.StatusCode || (exports.StatusCode = {}));
function SchemaBase(schema) {
    const defaultSchema = {
        status: {
            type: String,
            enum: [StatusCode.Active, StatusCode.Deactive],
            default: StatusCode.Active,
            required: true,
        },
    };
    return Object.assign(Object.assign({}, schema), defaultSchema);
}
exports.SchemaBase = SchemaBase;
