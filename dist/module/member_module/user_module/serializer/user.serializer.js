"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeCreateUser = void 0;
function serializeCreateUser(model) {
    if (!model) {
        console.log("err");
    }
    console.log('==========model===========', model);
    return {
        id: model.id,
        name: model.name,
        email: model.email,
    };
}
exports.serializeCreateUser = serializeCreateUser;
