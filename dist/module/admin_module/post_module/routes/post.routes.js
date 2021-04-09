"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRoute_admin = void 0;
const post_Controller_1 = require("../controllers/post.Controller");
const auth_middleware_1 = require("../../../../middlewares/auth.middleware");
class PostRoute_admin {
    constructor() {
        this.postController = new post_Controller_1.PostController();
    }
    routes(app) {
        // Tạo category
        app
            .route("/blog/api/category/:category_id/post")
            .get(auth_middleware_1.isAuth, this.postController.getAllPost);
        app
            .route("/blog/api/category/:category_id/post/:post_id")
            .delete(auth_middleware_1.isAuth, this.postController.deletePost);
    }
}
exports.PostRoute_admin = PostRoute_admin;
