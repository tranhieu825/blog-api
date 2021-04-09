import express from "express";
import { Post } from "../../../../common/user_common/model/post.model";
import { PostCreateSchema, PostUpdateSchema } from "../DTO/post.dto";
import {commonValidateBody} from "../../../../middlewares/validatebody.middlewares";
import { PostController}  from "../controllers/post.Controller";
import { isAuth } from "../../../../middlewares/auth.middleware";


export class PostRoute_admin {
  public postController: PostController = new PostController();
  public routes(app: express.Application): void {
    // Tạo category
    app
      .route("/blog/api/category/:category_id/post")
      .get(isAuth,this.postController.getAllPost)
    
    app
      .route("/blog/api/category/:category_id/post/:post_id")
      .delete(isAuth, this.postController.deletePost);
  }
}
