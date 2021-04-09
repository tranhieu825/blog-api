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
const response_service_1 = require("../../../common/user_common/service/response.service");
const post_model_1 = require("../../../common/user_common/model/post.model");
const common_model_1 = require("../../../common/user_common/model/common.model");
class PostController {
    constructor() {
        this.postService = new post_service_1.PostService(post_model_1.Post);
        // Tạo 1 bài post
        this.createPost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const role = req.authorized_user.role;
                const { category_id } = req.params;
                if (role) {
                    const formPost = req.body;
                    const check = yield post_model_1.Post.find({
                        title: formPost.title,
                        status: common_model_1.StatusCode.Active,
                        content: formPost.content,
                    });
                    if (check.length > 0) {
                        const messageError = "Nó đã tồn tại";
                        return response_service_1.error(res, messageError, 200);
                    }
                    formPost.user_id = req.authorized_user._id;
                    formPost.category_id = category_id;
                    const post = yield this.postService.create(formPost);
                    const messageSuccess = "You have been created category successfully";
                    console.log(messageSuccess);
                    //  return  res.json(serializeCreateCategory(category));
                    return response_service_1.success(res, messageSuccess, 201);
                }
                const messageError = "You cannot create group, you aren't admin";
                return response_service_1.error(res, messageError, 200);
            }
            catch (err) {
                return response_service_1.error(res, "Error", 200);
            }
        });
        // Xem tất cả bài post
        this.getAllPost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { category_id } = req.params;
                const id = req.authorized_user._id;
                const result = yield post_model_1.Post.find({ status: common_model_1.StatusCode.Active, user_id: id }, "title content createdAt ").populate({ path: 'user_id', select: "name" }).populate({ path: 'category_id', select: "title", }).sort({ updatedAt: -1 });
                return response_service_1.success(res, result);
            }
            catch (err) {
                return response_service_1.error(res, "Error", 200);
            }
        });
        // Update một bài post
        this.updatePost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { category_id } = req.params;
                console.log("------------Post", category_id);
                const { post_id } = req.params;
                const id = req.authorized_user._id;
                const check = yield post_model_1.Post.find({
                    status: common_model_1.StatusCode.Active, post_id: post_id
                });
                const formPost = req.body;
                const post = yield this.postService.updateOne(post_id, formPost);
                const messageSuccess = "You have been update post successfully";
                return response_service_1.success(res, messageSuccess, 201);
            }
            catch (err) {
                return response_service_1.error(res, "Error", 200);
            }
        });
        // Xoá một bài viết
        this.deletePost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { post_id } = req.params;
                const id = req.authorized_user._id;
                const check = yield post_model_1.Post.find({
                    status: common_model_1.StatusCode.Active, post_id: post_id
                });
                const statusPost = common_model_1.StatusCode.Deactive;
                const post = yield this.postService.deleteOne(post_id, statusPost);
                const messageSuccess = "You have been Delete post successfully";
                return response_service_1.success(res, messageSuccess, 201);
            }
            catch (err) {
                return response_service_1.error(res, "Error", 200);
            }
        });
        // Search dữ liệu
        this.getAllSearch = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const searchBody = req.body.title;
                const result = yield post_model_1.Post.find({
                    $text: { $search: searchBody }
                });
                console.log(result);
                return response_service_1.success(res, result);
            }
            catch (err) {
                return response_service_1.error(res, "Error", 200);
            }
        });
    }
}
exports.PostController = PostController;
