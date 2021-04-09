"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoute = void 0;
const user_dto_1 = require("../DTO/user.dto");
const validatebody_middlewares_1 = require("../../../middlewares/validatebody.middlewares");
const user_Controller_1 = require("../controllers/user.Controller");
const auth_middleware_1 = require("../../../middlewares/auth.middleware");
class UserRoute {
    constructor() {
        this.userController = new user_Controller_1.UserController();
    }
    routes(app) {
        // Đăng kí user
        app
            .route("/blog/api/signup")
            .post(validatebody_middlewares_1.commonValidateBody(user_dto_1.UserCreateSchema), this.userController.createUser);
        // Đăng nhập user
        app
            .route("/blog/api/login")
            .post(validatebody_middlewares_1.commonValidateBody(user_dto_1.UserLoginSchema), this.userController.loginUser);
        // Đăng xuất
        app
            .route("/blog/api/logout")
            .get(auth_middleware_1.isAuth, this.userController.logoutUser);
        app
            .route("/blog/api/info")
            .get(auth_middleware_1.isAuth, this.userController.getUser)
            .patch(auth_middleware_1.isAuth, validatebody_middlewares_1.commonValidateBody(user_dto_1.UserChangeSchema), this.userController.updateUser);
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
exports.UserRoute = UserRoute;
