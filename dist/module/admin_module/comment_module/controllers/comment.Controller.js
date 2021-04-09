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
exports.CommentController = void 0;
const comment_service_1 = require("../services/comment.service");
const response_service_1 = require("../../../../common/user_common/service/response.service");
const comment_model_1 = require("../../../../common/user_common/model/comment.model");
const post_model_1 = require("../../../../common/user_common/model/post.model");
const user_model_1 = require("../../../../common/user_common/model/user.model");
const common_model_1 = require("../../../../common/user_common/model/common.model");
class CommentController {
    constructor() {
        this.commentService = new comment_service_1.CommentService(comment_model_1.Comment);
        // Xem tất cả comment trong bài Post
        this.getAllComment = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { post_id } = req.params;
                const role = req.authorized_user.role;
                if (role === user_model_1.RoleCode.Admin) {
                    const check = yield post_model_1.Post.find({
                        status: common_model_1.StatusCode.Active, _id: post_id,
                    });
                    if (check.length !== 0) {
                        const result = yield comment_model_1.Comment.find({ status: common_model_1.StatusCode.Active, post_id: post_id }, "content post_id").populate({ path: 'user_id', select: "name" }).populate({ path: 'post_id', select: "title" }).sort({ updatedAt: -1 });
                        return response_service_1.success(res, result);
                    }
                    return response_service_1.error(res, "Không tìm thấy URL", 200);
                }
                return response_service_1.error(res, "Bạn không có quyền này", 200);
            }
            catch (err) {
                return response_service_1.error(res, "Error", 200);
            }
        });
        // Xoá một comment
        this.deleteComment = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { post_id, comment_id } = req.params;
                const id = req.authorized_user._id;
                const role = req.authorized_user.role;
                if (role === user_model_1.RoleCode.Admin) {
                    const check = yield comment_model_1.Comment.find({
                        status: common_model_1.StatusCode.Active, user_id: id
                    });
                    if (check) {
                        const statusComment = common_model_1.StatusCode.Deactive;
                        const comment = yield this.commentService.deleteOne(comment_id, statusComment);
                        const messageSuccess = "You have been Delete comment successfully";
                        return response_service_1.success(res, messageSuccess, 201);
                    }
                    const messageError = "Không tồn tại comment này";
                    return response_service_1.error(res, messageError, 200);
                }
                return response_service_1.error(res, "Bạn không có quyền này", 200);
            }
            catch (err) {
                return response_service_1.error(res, "Error", 200);
            }
        });
    }
}
exports.CommentController = CommentController;
