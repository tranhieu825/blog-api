"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const helper_middleware_1 = require("./helper.middleware");
const token_model_1 = require("../common/user_common/model/token.model");
const env_1 = require("../config/env");
const response_service_1 = require("../common/user_common/service/response.service");
// process.env.ACCESS_TOKEN_SECRET
const isAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenFromClient = req.headers["authorization"];
    console.log("===========tokenFromClient=======", tokenFromClient);
    if (typeof tokenFromClient !== "undefined") {
        try {
            const bearer = tokenFromClient.split(" ");
            const bearerToken = bearer[1];
            const check = yield token_model_1.Token.find({ accessToken: bearerToken });
            if (check.length == 0) {
                const messageError = "Unauthorized";
                return response_service_1.error(res, messageError, 401);
            }
            const decoded = yield helper_middleware_1.verifyToken(bearerToken, env_1.ACCESS_TOKEN_SECRET);
            req.authorized_user = decoded;
            next();
        }
        catch (err) {
            return response_service_1.error(res, err);
        }
    }
    // return res.status(403).send({
    // message: "No token provided",
    // });
});
exports.isAuth = isAuth;
