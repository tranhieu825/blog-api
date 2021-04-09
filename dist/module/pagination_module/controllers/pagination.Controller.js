"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationController = void 0;
const response_service_1 = require("../../../common/user_common/service/response.service");
const post_model_1 = require("../../../common/user_common/model/post.model");
class PaginationController {
    constructor() {
        // Phân trang trang chính
        this.getPerPage = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let perPage = 2; // số lượng bài post xuất hiện trên 1 page
                let page_id = req.params.page_id || 1;
                post_model_1.Post.find() // find tất cả các data
                    .skip((perPage * page_id) - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
                    .limit(perPage)
                    .exec((err, post) => {
                    post_model_1.Post.countDocuments((err, count) => {
                        if (err)
                            return response_service_1.error(res, "Error");
                        return response_service_1.success(res, post); // Trả về dữ liệu các sản phẩm theo định dạng như JSON, XML,...
                    });
                });
            }
            catch (err) {
                return response_service_1.error(res, "Error", 200);
            }
        });
        // Phân trang theo category
        this.getPerPageCategory = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let perPage = 2; // số lượng bài post xuất hiện trên 1 page
                let page_id = req.params.page_id || 1;
                const category_id = req.params.category_id;
                post_model_1.Post.find({
                    category_id: category_id,
                }) // find post theo category
                    .skip((perPage * page_id) - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
                    .limit(perPage)
                    .exec((err, post) => {
                    post_model_1.Post.countDocuments((err, count) => {
                        if (err)
                            return response_service_1.error(res, "Error");
                        return response_service_1.success(res, post); // Trả về dữ liệu các sản phẩm theo định dạng như JSON, XML,...
                    });
                });
            }
            catch (err) {
                return response_service_1.error(res, "Error", 200);
            }
        });
    }
}
exports.PaginationController = PaginationController;
