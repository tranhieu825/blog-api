import { Request, Response } from "express";
import { CommonService } from "../services/common.service";
import { success, error } from "../../../common/user_common/service/response.service";
import { Post } from "../../../common/user_common/model/post.model";
import { Category } from "../../../common/user_common/model/category.model";
export class CommonController{
  
  // Phân trang trang chính
  getPerPage = async (req:Request, res: Response) => {
    try {
      let perPage: any = 2; // số lượng bài post xuất hiện trên 1 page
      let page_id: any = req.params.page_id || 1; 
      Post.find() // find tất cả các data
      .skip((perPage * page_id) - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
      .limit(perPage)
      .exec((err, post) => {
      Post.countDocuments((err, count) => { // đếm để tính có bao nhiêu trang
          if (err) return error(res,"Error");
          return success(res,post); // Trả về dữ liệu các sản phẩm theo định dạng như JSON, XML,...
        });
      });
      
        }
    catch (err) {
      return error(res, "Error", 200);
    }
  }


  // Phân trang theo category

   getPerPageCategory = async (req:Request, res: Response) => {
    try {
      let perPage: any = 2; // số lượng bài post xuất hiện trên 1 page
      let page_id: any = req.params.page_id || 1; 
      const category_id: any = req.params.category_id;
      Post.find({
          category_id: category_id,
          }) // find post theo category
      .skip((perPage * page_id) - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
      .limit(perPage)
      .exec((err, post) => {
      Post.countDocuments((err, count) => { // đếm để tính có bao nhiêu trang
          if (err) return error(res,"Error");
          return success(res,post); // Trả về dữ liệu các sản phẩm theo định dạng như JSON, XML,...
        });
      });
      
        }
    catch (err) {
      return error(res, "Error", 200);
    }
  }



  // Phân trang theo search

   getAllSearch = async (req:Request, res: Response) => {
    try {
      let perPage: any = 2; // số lượng bài post xuất hiện trên 1 page
      let page_id: any = req.params.page_id || 1; 
      const searchBody = req.body.title;
      Post.find({
            $text:{ $search: searchBody }
          }) // find post theo category
      .skip((perPage * page_id) - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
      .limit(perPage)
      .exec((err, post) => {
      Post.countDocuments((err, count) => { // đếm để tính có bao nhiêu trang
          if (err) return error(res,"Error");
          return success(res,post); // Trả về dữ liệu các sản phẩm theo định dạng như JSON, XML,...
        });
      });
      
        }
    catch (err) {
      return error(res, "Error", 200);
    }
  }


}