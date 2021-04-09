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
exports.CategoryController = void 0;
const category_service_1 = require("../services/category.service");
const response_service_1 = require("../../../common/user_common/service/response.service");
const category_model_1 = require("../../../common/user_common/model/category.model");
const common_model_1 = require("../../../common/user_common/model/common.model");
class CategoryController {
    constructor() {
        // Hiển thị tất cả Category
        this.categoryService = new category_service_1.CategoryService(category_model_1.Category);
        this.getAllCategory = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("--ok");
                const id = req.authorized_user._id;
                const result = yield category_model_1.Category.find({ status: common_model_1.StatusCode.Active, user_id: id }, "title createdAt ").populate({ path: 'user_id', select: "name" }).sort({ updatedAt: -1 });
                return response_service_1.success(res, result);
            }
            catch (err) {
                return response_service_1.error(res, "Error", 200);
            }
        });
        // Tạo 1 category
        this.createCategory = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const role = req.authorized_user.role;
                if (role === 'admin') {
                    const formCategory = req.body;
                    const check = yield category_model_1.Category.find({
                        title: formCategory.title,
                        status: common_model_1.StatusCode.Active,
                    });
                    if (check.length > 0) {
                        const messageError = "Nó đã tồn tại";
                        return response_service_1.error(res, messageError, 200);
                    }
                    formCategory.user_id = req.authorized_user._id;
                    const category = yield this.categoryService.create(formCategory);
                    const messageSuccess = "You have been created category successfully";
                    console.log(messageSuccess);
                    //  return  res.json(serializeCreateCategory(category));
                    return response_service_1.success(res, messageSuccess, 201);
                }
                const messageError = "You cannot create category, you aren't admin";
                return response_service_1.error(res, messageError, 200);
            }
            catch (err) {
                return response_service_1.error(res, "Error", 200);
            }
        });
        // Update 1 category
        this.updateCategory = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { category_id } = req.params;
                const id = req.authorized_user._id;
                const role = req.authorized_user.role;
                if (role === 'admin') {
                    const check = yield category_model_1.Category.find({
                        status: common_model_1.StatusCode.Active, user_id: id
                    });
                    const formCategory = req.body;
                    const post = yield this.categoryService.updateOne(category_id, formCategory);
                    const messageSuccess = "You have been update post successfully";
                    return response_service_1.success(res, messageSuccess, 201);
                }
                const messageError = "You cannot updateCategory, you aren't admin";
                return response_service_1.error(res, messageError, 200);
            }
            catch (err) {
                return response_service_1.error(res, "Error", 200);
            }
        });
        // Xoá một category
        this.deleteCategory = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { category_id } = req.params;
                const id = req.authorized_user._id;
                const role = req.authorized_user.role;
                if (role === 'admin') {
                    const check = yield category_model_1.Category.find({
                        status: common_model_1.StatusCode.Active, user_id: id
                    });
                    const statusCategory = common_model_1.StatusCode.Deactive;
                    const category = yield this.categoryService.deleteOne(category_id, statusCategory);
                    const messageSuccess = "You have been Delete category successfully";
                    return response_service_1.success(res, messageSuccess, 201);
                }
                const messageError = "You cannot updateCategory, you aren't admin";
                return response_service_1.error(res, messageError, 200);
            }
            catch (err) {
                return response_service_1.error(res, "Error", 200);
            }
        });
    }
}
exports.CategoryController = CategoryController;
