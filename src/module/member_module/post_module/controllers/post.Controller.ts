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

    // Tạo 1 bài post

 createPost = async (req: Request, res: Response) => {
    try {
     const role = req.authorized_user.role;
     const { category_id } = req.params;
     if (role) {
        const formPost: IPostCreateForm = req.body;
        const check = await Post.find({
          title: formPost.title,
          status: StatusCode.Active,
          content: formPost.content,
        });
        if (check.length > 0) {
          const messageError = "Nó đã tồn tại";
          return error(res, messageError, 200);
        }
        formPost.user_id = req.authorized_user._id;
        formPost.category_id = category_id;
        const post = await this.postService.create(formPost);
        const messageSuccess = "You have been created category successfully";
        console.log(messageSuccess);
       //  return  res.json(serializeCreateCategory(category));
        return success(res, messageSuccess, 201);
      }
      
      const messageError = "You cannot create group, you aren't admin";
      return error(res, messageError, 200);
    } catch (err) {
      return error(res, "Error", 200);
    }
  };

  // Xem tất cả bài post

    getAllPost = async (req: Request, res: Response) => {
      try {
         const { category_id } = req.params;
         const id = req.authorized_user._id;
         const result = await Post.find(
          { status: StatusCode.Active, user_id: id},
          "title content createdAt "
        ).populate({path:'user_id',select:"name" }).populate({path:'category_id',select:"title",}).sort({ updatedAt: -1 });
        return success(res, result);
      } catch (err) {
        return error(res, "Error", 200);
      }
    };


  // Update một bài post

   updatePost = async (req:Request, res: Response) => {
    try {
        const { category_id } = req.params;
        console.log("------------Post",category_id);
        const { post_id } = req.params;
        const id = req.authorized_user._id;
        const check = await Post.find(
        {
          status: StatusCode.Active,post_id: post_id
        })
        if(check)
        {
        const formPost: IPostUpdateForm = req.body;
        const post = await this.postService.updateOne(post_id,formPost);
        const messageSuccess = "You have been update post successfully";
        return success(res, messageSuccess, 201);
        }
        const messageError = "Không tồn tại bào post"
        return error(res,messageError, 200);

    }
    catch (err) {
       return error(res, "Error", 200);
    }
   }

   // Xoá một bài viết

   deletePost = async (req: Request, res: Response) => {
    try {    
      const { post_id } = req.params;
      const id = req.authorized_user._id;
      const check = await Post.find(
        {
          status: StatusCode.Active,post_id: post_id
        })
      if(check){
      const statusPost = StatusCode.Deactive;
      const post = await this.postService.deleteOne(post_id,statusPost);
      const messageSuccess = "You have been Delete post successfully";
      return success(res, messageSuccess, 201);
      }
      const messageSuccess = "Không tồn tại bài post"
      return error(res, "Error", 200);
    }

    catch (err) {
      return error(res, "Error", 200);
    }
   }

  // Search dữ liệu

  getAllSearch = async (req:Request, res: Response) => {
    try {
      const searchBody = req.body.title;
      const result = await Post.find({
         $text:{ $search: searchBody } }
        )
      console.log(result);
        return success(res,result);
        }
    catch (err) {
      return error(res, "Error", 200);
    }
  }

}