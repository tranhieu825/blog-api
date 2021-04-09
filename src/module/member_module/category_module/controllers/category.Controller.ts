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
      console.log("--ok");
      const result = await Category.find(
        { status: StatusCode.Active},
        "title createdAt "
      ).populate({path:'user_id',select:"name" }).sort({ updatedAt: -1 });
      return success(res, result);
    } catch (err) {
      return error(res, "Error", 200);
    }
  };

   }