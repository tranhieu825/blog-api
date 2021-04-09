import express from "express";
import { Category } from "../../../../common/user_common/model/category.model";
import { CategoryCreateSchema,CategoryUpdateSchema } from "../DTO/category.dto";
import {commonValidateBody} from "../../../../middlewares/validatebody.middlewares";
import { CategoryController}  from "../controllers/category.Controller";
import { isAuth } from "../../../../middlewares/auth.middleware";


export class CategoryRoute_admin {
  public categoryController: CategoryController = new CategoryController();
  public routes(app: express.Application): void {
    
    app
      .route("/blog/api/category")
      .get(isAuth,this.categoryController.getAllCategory)
      .post(
          isAuth,
          commonValidateBody(CategoryCreateSchema),
          this.categoryController.createCategory
      );
    app
      .route("/blog/api/category/:category_id")
      .put(
        isAuth,
        commonValidateBody(CategoryUpdateSchema),
        this.categoryController.updateCategory)
      .delete(isAuth, this.categoryController.deleteCategory);
  }
}
