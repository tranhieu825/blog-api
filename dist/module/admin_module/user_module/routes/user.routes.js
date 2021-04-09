"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoute_admin = void 0;
const user_dto_1 = require("../DTO/user.dto");
const validatebody_middlewares_1 = require("../../../../middlewares/validatebody.middlewares");
const user_Controller_1 = require("../controllers/user.Controller");
const auth_middleware_1 = require("../../../../middlewares/auth.middleware");
class AdminRoute_admin {
    constructor() {
        this.userController = new user_Controller_1.UserController();
    }
    routes(app) {
        // Đăng nhập user
        app
            .route("/blog/api/admin/login")
            .post(validatebody_middlewares_1.commonValidateBody(user_dto_1.UserLoginSchema), this.userController.loginUser);
        // Đăng xuất
        app
            .route("/blog/api/admin/logout")
            .get(auth_middleware_1.isAuth, this.userController.logoutUser);
        // Xem danh sách user (admin)
        app.route("/blog/api/admin/info").get(auth_middleware_1.isAuth, this.userController.getAllUser);
        // get, change role, delete user
        app
            .route("/blog/api/admin/info/:user_id")
            .get(auth_middleware_1.isAuth, this.userController.getUserById)
            .delete(auth_middleware_1.isAuth, this.userController.deleteUser);
        // Refest token
        app.route("/user/api/refresh-token").post(this.userController.refreshToken);
    }
}
exports.AdminRoute_admin = AdminRoute_admin;
