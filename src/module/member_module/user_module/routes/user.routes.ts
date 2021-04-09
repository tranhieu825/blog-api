import express from "express";
import { User } from "../../../../common/user_common/model/user.model";
import { UserCreateSchema,UserLoginSchema,UserChangeSchema } from "../DTO/user.dto";
import {commonValidateBody} from "../../../../middlewares/validatebody.middlewares";
import { UserController}  from "../controllers/user.Controller";
import { isAuth } from "../../../../middlewares/auth.middleware";
export class MemberRoute_member {
  public userController: UserController = new UserController();
  public routes(app: express.Application): void {

    // Đăng kí user
    app
      .route("/blog/api/signup")
      .post(
        commonValidateBody(UserCreateSchema),
        this.userController.createUser
      );


    // Đăng nhập user
     app
      .route("/blog/api/login")
      .post(
        commonValidateBody(UserLoginSchema),
      	this.userController.loginUser
      );

    // Đăng xuất
     app
      .route("/blog/api/logout")
      .get(
        isAuth,
        this.userController.logoutUser
      );

    // Xem thông tin cá nhân và thay đổi mật khẩu
      app
      .route("/blog/api/info")
      .get(isAuth, this.userController.getUser)
      .patch(
        isAuth,
        commonValidateBody(UserChangeSchema),
        this.userController.updateUser
      );


    // Refest token
     app.route("/user/api/refresh-token").post(this.userController.refreshToken);
  }
}
