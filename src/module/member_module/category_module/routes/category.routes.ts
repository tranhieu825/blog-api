import express from "express";
import { Category } from "../../../../common/user_common/model/category.model";
import { CategoryCreateSchema,CategoryUpdateSchema } from "../DTO/category.dto";
import {commonValidateBody} from "../../../../middlewares/validatebody.middlewares";
import { CategoryController}  from "../controllers/category.Controller";
import { isAuth } from "../../../../middlewares/auth.middleware";


export class CategoryRoute_member {
  public categoryController: CategoryController = new CategoryController();
  public routes(app: express.Application): void {
    
    app
      .route("/blog/api/category")
      .get(isAuth,this.categoryController.getAllCategory)
  }
}
