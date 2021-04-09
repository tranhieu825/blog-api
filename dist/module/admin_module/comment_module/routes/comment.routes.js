"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentRoute_admin = void 0;
const comment_Controller_1 = require("../controllers/comment.Controller");
const auth_middleware_1 = require("../../../../middlewares/auth.middleware");
class CommentRoute_admin {
    constructor() {
        this.commentController = new comment_Controller_1.CommentController();
    }
    routes(app) {
        // Tạo comment
        app
            .route("/blog/api/category/:category_id/post/:post_id/comment")
            .get(auth_middleware_1.isAuth, this.commentController.getAllComment);
        app
            .route("/blog/api/category/:category_id/post/:post_id/comment/:comment_id")
            .delete(auth_middleware_1.isAuth, this.commentController.deleteComment);
    }
}
exports.CommentRoute_admin = CommentRoute_admin;
