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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_service_1 = require("../services/user.service");
const response_service_1 = require("../../../common/user_common/service/response.service");
const user_model_1 = require("../../../common/user_common/model/user.model");
const user_model_2 = require("../../../common/user_common/model/user.model");
const common_model_1 = require("../../../common/user_common/model/common.model");
const token_model_1 = require("../../../common/user_common/model/token.model");
const user_serializer_1 = require("../serializer/user.serializer");
const env_1 = require("../../../config/env");
const helper_middleware_1 = require("../../../middlewares/helper.middleware");
class UserController {
    constructor() {
        this.userService = new user_service_1.UserService(user_model_1.User);
        // Register thành viên
        this.createUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const form = req.body;
                const mailExist = yield this.userService.findByEmail(form);
                if (mailExist.length === 1) {
                    const messageError = "Email has been existed";
                    return response_service_1.error(res, messageError, 200);
                }
                form.password = yield bcrypt_1.default.hash(req.body.password, 10);
                const user = yield this.userService.create(form);
                const messageSuccess = "Create successfully";
                return res.json(user_serializer_1.serializeCreateUser(user));
            }
            catch (err) {
                return response_service_1.error(res, "Error", 200);
            }
        });
        // Login thành viên
        this.loginUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const form = req.body;
                const user = yield user_model_1.User.find({
                    email: form.email,
                });
                if (user.length === 1) {
                    const check = yield bcrypt_1.default.compare(form.password, user[0].password);
                    if (check) {
                        const accessToken = yield helper_middleware_1.generateToken(user[0], env_1.ACCESS_TOKEN_SECRET, env_1.ACCESS_TOKEN_LIFE);
                        const refreshToken = yield helper_middleware_1.generateToken(user[0], env_1.REFRESH_TOKEN_SECRET, env_1.REFRESH_TOKEN_LIFE);
                        const newToken = new token_model_1.Token({
                            accessToken,
                            refreshToken,
                            userId: user[0]._id,
                        });
                        yield newToken.save();
                        const result = {
                            accessToken,
                            refreshToken,
                            userId: user[0]._id,
                        };
                        const messageSuccess = "Token has been created successfully";
                        return response_service_1.success(res, result, messageSuccess, 201);
                    }
                    const messageError = "Password error";
                    return response_service_1.error(res, messageError, 200);
                }
                const messageError = "Email hasn't been existed";
                return response_service_1.error(res, messageError, 200);
            }
            catch (err) {
                return response_service_1.error(res, "Error", 200);
            }
        });
        // refest token
        this.refreshToken = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const refreshTokenFromClient = req.body.refreshToken;
            const refreshTokenSecret = "secret";
            const accessTokenSecret = "secret";
            const accessTokenLife = "1h";
            const checkToken = yield token_model_1.Token.find({
                refreshToken: refreshTokenFromClient,
            });
            if (refreshTokenFromClient && checkToken.length > 0) {
                try {
                    const decoded = yield helper_middleware_1.verifyToken(refreshTokenFromClient, refreshTokenSecret);
                    const accessToken = yield helper_middleware_1.generateToken(decoded, accessTokenSecret, accessTokenLife);
                    yield token_model_1.Token.updateOne({ refreshToken: refreshTokenFromClient }, { $set: { accessToken: accessToken } });
                    const result = {
                        accessToken,
                        refreshTokenFromClient,
                    };
                    const messageSuccess = "Access-token has been updated successfully";
                    return response_service_1.success(res, result, messageSuccess, 201);
                }
                catch (err) {
                    const messageError = "Invalid refresh token";
                    return response_service_1.error(res, messageError, 403);
                }
            }
            const messageError = "No token provided";
            return response_service_1.error(res, messageError, 403);
        });
        // Get info user
        this.getUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id } = req.authorized_user;
                const result = yield user_model_1.User.findById(_id, "_id email role phone name");
                const messageSuccess = "You have get info user successfully";
                return response_service_1.success(res, result, messageSuccess);
            }
            catch (err) {
                return response_service_1.error(res, "Error", 200);
            }
        });
        // Get all user ( admin )
        this.getAllUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { role } = req.authorized_user;
                if (role === user_model_2.RoleCode.Admin) {
                    const result = yield user_model_1.User.find({}, "_id email role phone name status").sort({ role: 1, status: 1 });
                    const messageSuccess = "You have get all user successfully";
                    return response_service_1.success(res, result, messageSuccess);
                }
                const messageError = "You cannot get all user, you aren't admin";
                return response_service_1.error(res, messageError, 403);
            }
            catch (err) {
                return response_service_1.error(res, "Error", 200);
            }
        });
        // Delete user (admin)
        this.deleteUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { role } = req.authorized_user;
                if (role === user_model_2.RoleCode.Admin) {
                    const { user_id } = req.params;
                    const check = yield user_model_1.User.findById(user_id);
                    if (check.role === user_model_2.RoleCode.Admin) {
                        const messageError = "You can not delete admin";
                        return response_service_1.error(res, messageError, 200);
                    }
                    if (check.status === common_model_1.StatusCode.Deactive) {
                        const messageError = "User has been deleted";
                        return response_service_1.error(res, messageError, 200);
                    }
                    yield user_model_1.User.findByIdAndUpdate(user_id, {
                        $set: {
                            status: common_model_1.StatusCode.Deactive,
                        },
                    });
                    const messageSuccess = "You have deleted user successfully";
                    return response_service_1.success(res, null, messageSuccess);
                }
                const messageError = "You cannot delete user, you aren't admin";
                return response_service_1.error(res, messageError, 403);
            }
            catch (err) {
                return response_service_1.error(res, "Error", 200);
            }
        });
        // get user by id (admin)
        this.getUserById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { role } = req.authorized_user;
                if (role === user_model_2.RoleCode.Admin) {
                    const { user_id } = req.params;
                    const result = yield user_model_1.User.findById(user_id, "_id email role phone name status");
                    const messageSuccess = "You have get user by ID successfully";
                    return response_service_1.success(res, result, messageSuccess);
                }
                const messageError = "You cannot get user, you aren't admin";
                return response_service_1.error(res, messageError, 403);
            }
            catch (err) {
                return response_service_1.error(res, "Error", 200);
            }
        });
        // Logout
        this.logoutUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id } = req.authorized_user;
                yield token_model_1.Token.remove({ userId: _id });
                const messageSuccess = "You have logouted successfully";
                return response_service_1.success(res, null, messageSuccess, 200);
            }
            catch (err) {
                return response_service_1.error(res, "Error", 200);
            }
        });
        // Thay đổi password
        this.updateUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { oldpassword, newpassword, renewpassword } = req.body;
                const { _id } = req.authorized_user;
                const user = yield user_model_1.User.findById(_id);
                const check = yield bcrypt_1.default.compare(oldpassword, user.password);
                if (check) {
                    if (oldpassword === newpassword) {
                        const messageError = "Newpassword has different from oldpassword";
                        return response_service_1.error(res, messageError, 200);
                    }
                    if (newpassword === renewpassword) {
                        const user = yield user_model_1.User.findByIdAndUpdate(_id, {
                            $set: {
                                password: yield bcrypt_1.default.hash(newpassword, 10),
                            },
                        }, {
                            new: true,
                            useFindAndModify: false,
                        });
                        const messageSuccess = "User have been updated successfully";
                        return response_service_1.success(res, messageSuccess, 201);
                    }
                    const messageError = "Re-password invalid";
                    return response_service_1.error(res, messageError, 200);
                }
                const messageError = "Oldpassword user unsuccessfully";
                return response_service_1.error(res, messageError, 200);
            }
            catch (err) {
                return response_service_1.error(res, "Error", 200);
            }
        });
    }
}
exports.UserController = UserController;
