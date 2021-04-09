"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeCreateCategory = void 0;
function serializeCreateCategory(model) {
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
exports.serializeCreateCategory = serializeCreateCategory;
