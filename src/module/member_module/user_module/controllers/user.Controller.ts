import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { UserService } from "../services/user.service";
import { success, error } from "../../../../common/user_common/service/response.service";
import { User } from "../../../../common/user_common/model/user.model";
import { RoleCode } from "../../../../common/user_common/model/user.model";
import { StatusCode} from "../../../../common/user_common/model/common.model";
import { Token } from "../../../../common/user_common/model/token.model";

import {
  serializeCreateUser,
} from "../serializer/user.serializer";
import {
  IUserCreateForm,
  IUserLoginForm,

} from "../models/user.model";

import {
  ACCESS_TOKEN_LIFE,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_LIFE,
  REFRESH_TOKEN_SECRET,
} from "../../../../config/env";

import {
  generateToken,
  verifyToken,
} from "../../../../middlewares/helper.middleware";

export class UserController{

    public userService: UserService = new UserService(User);

    // Register thành viên

    createUser = async (req: Request, res: Response) => {
    try {
      const form: IUserCreateForm = req.body;
      const mailExist = await this.userService.findByEmail(form);
      if (mailExist.length === 1) {
        const messageError = "Email has been existed";
        return error(res, messageError, 200);
      }
      form.password = await bcrypt.hash(req.body.password, 10);
      const user = await this.userService.create(form);
      const messageSuccess = "Create successfully";
      return  res.json(serializeCreateUser(user));
    } catch (err) {
       return error(res, "Error", 200);
    }
  }


    // Login thành viên

    loginUser = async (req: Request, res: Response) => {
    try {
      const form: IUserLoginForm = req.body;
      const user = await User.find({
        email: form.email,
      });
      if (user.length === 1) {
        const check = await bcrypt.compare(form.password, user[0].password);
        if (check) {
          const accessToken = await generateToken(
            user[0],
            ACCESS_TOKEN_SECRET,
            ACCESS_TOKEN_LIFE
          );

          const refreshToken = await generateToken(
            user[0],
            REFRESH_TOKEN_SECRET,
            REFRESH_TOKEN_LIFE
          );

          const newToken = new Token({
            accessToken,
            refreshToken,
            userId: user[0]._id,
          });
          await newToken.save();

          const result = {
            accessToken,
            refreshToken,
            userId: user[0]._id,
          };

          const messageSuccess = "Token has been created successfully";
          return success(res, result, messageSuccess, 201);
        }
        const messageError = "Password error";
        return error(res, messageError, 200);
      }
      const messageError = "Email hasn't been existed";
      return error(res, messageError, 200);
    } catch (err) {
      return error(res, "Error", 200);
    }
  };

  // refest token

    refreshToken = async (req: Request, res: Response) => {
    const refreshTokenFromClient = req.body.refreshToken;
    const refreshTokenSecret = "secret";
    const accessTokenSecret = "secret";
    const accessTokenLife = "1h";

    const checkToken = await Token.find({
      refreshToken: refreshTokenFromClient,
    });
    if (refreshTokenFromClient && checkToken.length > 0) {
      try {
        const decoded = await verifyToken(
          refreshTokenFromClient,
          refreshTokenSecret
        );

        const accessToken: any = await generateToken(
          decoded,
          accessTokenSecret,
          accessTokenLife
        );

        await Token.updateOne(
          { refreshToken: refreshTokenFromClient },
          { $set: { accessToken: accessToken } }
        );

        const result = {
          accessToken,
          refreshTokenFromClient,
        };
        const messageSuccess = "Access-token has been updated successfully";
        return success(res, result, messageSuccess, 201);
      } catch (err) {
        const messageError = "Invalid refresh token";
        return error(res, messageError, 403);
      }
    }

    const messageError = "No token provided";
    return error(res, messageError, 403);
  };

  // Get info member
   getUser = async (req: Request, res: Response) => {
    try {
      const { _id } = req.authorized_user;
      const result = await User.findById(
        _id,
        "_id email role phone name"
      );
      const messageSuccess = "You have get info user successfully";
      return success(res, result, messageSuccess);
    } catch (err) {
      return error(res, "Error", 200);
    }
  };


  
  // Logout

   logoutUser = async (req: Request, res: Response) => {
    try {
      const { _id } = req.authorized_user;
      await Token.remove({ userId: _id });
      const messageSuccess = "You have logouted successfully";
      return success(res, null, messageSuccess, 200);
    } catch (err) {
      return error(res, "Error", 200);
    }
  };

  // Thay đổi password
  updateUser = async (req: Request, res: Response) => {
    try {
      const { oldpassword, newpassword, renewpassword } = req.body;

      const { _id } = req.authorized_user;
      const user: any = await User.findById(_id);
      const check = await bcrypt.compare(oldpassword, user.password);

      if (check) {
        if (oldpassword === newpassword) {
          const messageError = "Newpassword has different from oldpassword";
          return error(res, messageError, 200);
        }
        if (newpassword === renewpassword) {
          const user: any = await User.findByIdAndUpdate(
            _id,
            {
              $set: {
                password: await bcrypt.hash(newpassword, 10),
              },
            },
            {
              new: true,
              useFindAndModify: false,
            }
          );

          const messageSuccess = "User have been updated successfully";
          return success(res, messageSuccess, 201);
        }
        const messageError = "Re-password invalid";
        return error(res, messageError, 200);
      }
      const messageError = "Oldpassword user unsuccessfully";
      return error(res, messageError, 200);
    } catch (err) {
      return error(res, "Error", 200);
    }
  };

}