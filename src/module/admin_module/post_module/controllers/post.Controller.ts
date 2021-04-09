import { Request, Response } from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { PostService } from "../services/post.service";
import { success, error } from "../../../../common/user_common/service/response.service";
import { Post } from "../../../../common/user_common/model/post.model";
import { RoleCode } from "../../../../common/user_common/model/user.model";
import { StatusCode} from "../../../../common/user_common/model/common.model";
import { Token } from "../../../../common/user_common/model/token.model";
import session from "express-session";
import {
  serializeCreatePost,
} from "../serializer/post.serializer";
import {
  IPostCreateForm,
  IPostUpdateForm,

} from "../models/post.model";

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

export class PostController{


public postService: PostService = new PostService(Post);


  // Xem tất cả bài post

    getAllPost = async (req: Request, res: Response) => {
      try {
         const { category_id } = req.params;
         const role = req.authorized_user.role;
         if(role === RoleCode.Admin){
         const result = await Post.find(
          { status: StatusCode.Active },
          "title content createdAt "
        ).populate({path:'user_id',select:"name" }).populate({path:'category_id',select:"title",}).sort({ updatedAt: -1 });
        return success(res, result);
      }
        const messageError = "Bạn không phải admin, bạn không thể xem toàn bộ bài post"
        return error(res, "Error", 200);
      } catch (err) {
        return error(res, "Error", 200);
      }
    };

   // Xoá một bài post

   deletePost = async (req: Request, res: Response) => {
    try {    
      const { post_id } = req.params;
      const id = req.authorized_user._id;
      const role = req.authorized_user.role;
      if(role === RoleCode.Admin){
      const check = await Post.find(
        {
          status: StatusCode.Active,post_id: post_id
        })
      const statusPost = StatusCode.Deactive;
      const post = await this.postService.deleteOne(post_id,statusPost);
      const messageSuccess = "You have been Delete post successfully";
      return success(res, messageSuccess, 201);
    }
      const messageError = " Bạn không có quyền xoá "
      return error(res, "Error", 200);
    }

    catch (err) {
      return error(res, "Error", 200);
    }
   }

}