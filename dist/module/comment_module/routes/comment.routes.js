"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentRoute = void 0;
const comment_dto_1 = require("../DTO/comment.dto");
const validatebody_middlewares_1 = require("../../../middlewares/validatebody.middlewares");
const comment_Controller_1 = require("../controllers/comment.Controller");
const auth_middleware_1 = require("../../../middlewares/auth.middleware");
class CommentRoute {
    constructor() {
        this.commentController = new comment_Controller_1.CommentController();
    }
    routes(app) {
        // Tạo comment
        app
            .route("/blog/api/category/:category_id/post/:post_id/comment")
            .get(auth_middleware_1.isAuth, this.commentController.getAllComment)
            .post(auth_middleware_1.isAuth, validatebody_middlewares_1.commonValidateBody(comment_dto_1.CommentCreateSchema), this.commentController.createComment);
        app
            .route("/blog/api/category/:category_id/post/:post_id/comment/:comment_id")
            .put(auth_middleware_1.isAuth, validatebody_middlewares_1.commonValidateBody(comment_dto_1.CommentUpdateSchema), this.commentController.updateComment)
            .delete(auth_middleware_1.isAuth, this.commentController.deleteComment);
    }
}
exports.CommentRoute = CommentRoute;
