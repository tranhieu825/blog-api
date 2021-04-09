import express from "express";
import { Comment} from "../../../../common/user_common/model/comment.model";
import { CommentCreateSchema, CommentUpdateSchema } from "../DTO/comment.dto";
import {commonValidateBody} from "../../../../middlewares/validatebody.middlewares";
import { CommentController}  from "../controllers/comment.Controller";
import { isAuth } from "../../../../middlewares/auth.middleware";


export class CommentRoute_member {
  public commentController: CommentController = new CommentController();
  public routes(app: express.Application): void {
    // Tạo comment
    app
      .route("/blog/api/category/:category_id/post/:post_id/comment")
      .get(isAuth,this.commentController.getAllComment)
      .post(
          isAuth,
          commonValidateBody(CommentCreateSchema),
          this.commentController.createComment
      );

    app
      .route("/blog/api/category/:category_id/post/:post_id/comment/:comment_id")
      .put(
          isAuth,
          commonValidateBody(CommentUpdateSchema),
          this.commentController.updateComment
      )
      .delete(isAuth, this.commentController.deleteComment);
  }
}
