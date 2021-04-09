"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeCreateComment = void 0;
function serializeCreateComment(model) {
    if (!model) {
        console.log("err");
    }
    console.log('==========model===========', model);
    return {
        id: model.id,
        content: model.content,
    };
}
exports.serializeCreateComment = serializeCreateComment;
