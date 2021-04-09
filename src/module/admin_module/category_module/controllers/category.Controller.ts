import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { CategoryService } from "../services/category.service";
import { success, error } from "../../../../common/user_common/service/response.service";
import { Category } from "../../../../common/user_common/model/category.model";
import { RoleCode } from "../../../../common/user_common/model/user.model";
import { StatusCode} from "../../../../common/user_common/model/common.model";
import { Token } from "../../../../common/user_common/model/token.model";
import session from "express-session";
import {
  serializeCreateCategory,
} from "../serializer/category.serializer";
import {
  ICategoryCreateForm,
  ICategoryUpdateForm,
} from "../models/category.model";

import {
  ACCESS_TOKEN_LIFE,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_LIFE,
  REFRESH_TOKEN_SECRET,
} from "../../../../config/env";

import {
  generateToken,
  verifyToken,
} from "../../../../middlewares/helper.middleware";

export class CategoryController{

  // Hiển thị tất cả Category

  public categoryService: CategoryService = new CategoryService(Category);
  getAllCategory = async (req: Request, res: Response) => {
    try {
     const role = req.authorized_user.role;
     if (role === RoleCode.Admin){
         const result = await Category.find(
        { status: StatusCode.Active},
        "title createdAt "
      ).populate({path:'user_id',select:"name" }).sort({ updatedAt: -1 });
      return success(res, result);
     }
     const messageError = " Bạn không có quyền này ";
      return error(res, messageError, 200);

    } catch (err) {
      return error(res, "Error", 200);
    }
  };

  // Tạo 1 category

 createCategory = async (req: Request, res: Response) => {
    try {
     const role = req.authorized_user.role;
     if (role === RoleCode.Admin) {
      const formCategory: ICategoryCreateForm = req.body;
        const check = await Category.find({
          title: formCategory.title,
          status: StatusCode.Active,
        });
        if (check.length > 0) {
          const messageError = "Nó đã tồn tại";
          return error(res, messageError, 200);
        }

        formCategory.user_id = req.authorized_user._id;
        const category = await this.categoryService.create(formCategory);
        const messageSuccess = "You have been created category successfully";
        console.log(messageSuccess);
       //  return  res.json(serializeCreateCategory(category));
        return success(res, messageSuccess, 201);
      }
      
      const messageError = "You cannot create category, you aren't admin";
      return error(res, messageError, 200);
    } catch (err) {
      return error(res, "Error", 200);
    }
  };

  // Update 1 category

  updateCategory = async (req:Request, res: Response) => {
    try {
        const { category_id } = req.params;
        const id = req.authorized_user._id;
        const role = req.authorized_user.role;
        if (role === RoleCode.Admin)
        {
        const check = await Category.find(
         {
          status: StatusCode.Active,user_id: id
         })
        const formCategory: ICategoryUpdateForm = req.body;
        const post = await this.categoryService.updateOne(category_id,formCategory);
        const messageSuccess = "You have been update post successfully";
        return success(res, messageSuccess, 201);
        }
      const messageError = "You cannot updateCategory, you aren't admin";
      return error(res, messageError, 200);
    }
    catch (err) {
       return error(res, "Error", 200);
    }
   }

   // Xoá một category

   deleteCategory = async (req: Request, res: Response) => {
    try {    
      const { category_id } = req.params;
      const id = req.authorized_user._id;
      const role = req.authorized_user.role;
      if (role === RoleCode.Admin)
      {
      const check = await Category.find(
        {
          status: StatusCode.Active,user_id: id
        })
      const statusCategory = StatusCode.Deactive;
      const category = await this.categoryService.deleteOne(category_id,statusCategory);
      const messageSuccess = "You have been Delete category successfully";
      return success(res, messageSuccess, 201);
      }
      const messageError = "You cannot updateCategory, you aren't admin";
      return error(res, messageError, 200);
    }
    
    catch (err) {
      return error(res, "Error", 200);
    }

   }

}