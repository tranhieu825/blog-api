import express from "express";
import { Post } from "../../../common/user_common/model/post.model";
import { CommonController}  from "../controllers/common.Controller";
import { isAuth } from "../../../middlewares/auth.middleware";


export class CommonRoute {
  public commonController: CommonController = new CommonController();
  public routes(app: express.Application): void {

    // Phân trang chính
     app
      .route("/blog/api/page/:page_id")
      .get(isAuth,this.commonController.getPerPage);

    // Phân trang theo category
     app
      .route("/blog/api/category/:category_id/page/:page_id")
      .get(isAuth,this.commonController.getPerPageCategory);

    // Search
     app
      .route("/blog/api/search/:page_id")
      .get(isAuth,this.commonController.getAllSearch);
  }
}
