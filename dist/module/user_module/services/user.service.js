"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_service_1 = require("../../../common/user_common/service/common.service");
class UserService extends common_service_1.BaseService {
    constructor(User) {
        super(User);
    }
}
exports.UserService = UserService;
