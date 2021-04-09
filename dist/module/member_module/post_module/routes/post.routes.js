"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRoute_member = void 0;
const post_dto_1 = require("../DTO/post.dto");
const validatebody_middlewares_1 = require("../../../../middlewares/validatebody.middlewares");
const post_Controller_1 = require("../controllers/post.Controller");
const auth_middleware_1 = require("../../../../middlewares/auth.middleware");
class PostRoute_member {
    constructor() {
        this.postController = new post_Controller_1.PostController();
    }
    routes(app) {
        // Tạo bài post, xem tất cả bài post của mình
        app
            .route("/blog/api/category/:category_id/post")
            .get(auth_middleware_1.isAuth, this.postController.getAllPost)
            .post(auth_middleware_1.isAuth, validatebody_middlewares_1.commonValidateBody(post_dto_1.PostCreateSchema), this.postController.createPost);
        // Update 1 bài post
        app
            .route("/blog/api/category/:category_id/post/:post_id")
            .put(auth_middleware_1.isAuth, validatebody_middlewares_1.commonValidateBody(post_dto_1.PostUpdateSchema), this.postController.updatePost)
            .delete(auth_middleware_1.isAuth, this.postController.deletePost);
        // Tìm kiếm bài post
        app
            .route("/blog/api/search")
            .get(auth_middleware_1.isAuth, this.postController.getAllSearch);
    }
}
exports.PostRoute_member = PostRoute_member;
