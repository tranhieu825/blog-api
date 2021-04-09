"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeCreatePost = void 0;
function serializeCreatePost(model) {
    if (!model) {
        console.log("err");
    }
    console.log('==========model===========', model);
    return {
        id: model.id,
        title: model.title,
        user_id: model.user_id,
    };
}
exports.serializeCreatePost = serializeCreatePost;
