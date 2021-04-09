import { verifyToken } from "./helper.middleware";
import { Request, Response, NextFunction } from "express";
import { Token } from "../common/user_common/model/token.model";
import { ACCESS_TOKEN_SECRET } from "../config/env";
import { error } from "../common/user_common/service/response.service";

// process.env.ACCESS_TOKEN_SECRET

export const isAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const tokenFromClient = req.headers["authorization"];
  console.log("===========tokenFromClient=======", tokenFromClient)

  if (typeof tokenFromClient !== "undefined") {
    try {
      const bearer = tokenFromClient.split(" ");
      const bearerToken = bearer[1];
      const check = await Token.find({ accessToken: bearerToken });
      if (check.length == 0) {
        const messageError = "Unauthorized";
        return error(res, messageError, 401);
      }

      const decoded: any = await verifyToken(bearerToken, ACCESS_TOKEN_SECRET);
      req.authorized_user= decoded;
      next();
    } catch (err) {
      return error(res, err);
    }
  }
 // return res.status(403).send({
 // message: "No token provided",
 // });
};
