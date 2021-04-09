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
exports.PostController = void 0;
const post_service_1 = require("../services/post.service");
const response_service_1 = require("../../../../common/user_common/service/response.service");
const post_model_1 = require("../../../../common/user_common/model/post.model");
const user_model_1 = require("../../../../common/user_common/model/user.model");
const common_model_1 = require("../../../../common/user_common/model/common.model");
class PostController {
    constructor() {
        this.postService = new post_service_1.PostService(post_model_1.Post);
        // Xem tất cả bài post
        this.getAllPost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { category_id } = req.params;
                const role = req.authorized_user.role;
                if (role === user_model_1.RoleCode.Admin) {
                    const result = yield post_model_1.Post.find({ status: common_model_1.StatusCode.Active }, "title content createdAt ").populate({ path: 'user_id', select: "name" }).populate({ path: 'category_id', select: "title", }).sort({ updatedAt: -1 });
                    return response_service_1.success(res, result);
                }
                const messageError = "Bạn không phải admin, bạn không thể xem toàn bộ bài post";
                return response_service_1.error(res, "Error", 200);
            }
            catch (err) {
                return response_service_1.error(res, "Error", 200);
            }
        });
        // Xoá một bài post
        this.deletePost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { post_id } = req.params;
                const id = req.authorized_user._id;
                const role = req.authorized_user.role;
                if (role === user_model_1.RoleCode.Admin) {
                    const check = yield post_model_1.Post.find({
                        status: common_model_1.StatusCode.Active, post_id: post_id
                    });
                    const statusPost = common_model_1.StatusCode.Deactive;
                    const post = yield this.postService.deleteOne(post_id, statusPost);
                    const messageSuccess = "You have been Delete post successfully";
                    return response_service_1.success(res, messageSuccess, 201);
                }
                const messageError = " Bạn không có quyền xoá ";
                return response_service_1.error(res, "Error", 200);
            }
            catch (err) {
                return response_service_1.error(res, "Error", 200);
            }
        });
    }
}
exports.PostController = PostController;
