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
const response_service_1 = require("../../../../common/user_common/service/response.service");
const category_model_1 = require("../../../../common/user_common/model/category.model");
const common_model_1 = require("../../../../common/user_common/model/common.model");
class CategoryController {
    constructor() {
        // Hiển thị tất cả Category
        this.categoryService = new category_service_1.CategoryService(category_model_1.Category);
        this.getAllCategory = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("--ok");
                const result = yield category_model_1.Category.find({ status: common_model_1.StatusCode.Active }, "title createdAt ").populate({ path: 'user_id', select: "name" }).sort({ updatedAt: -1 });
                return response_service_1.success(res, result);
            }
            catch (err) {
                return response_service_1.error(res, "Error", 200);
            }
        });
    }
}
exports.CategoryController = CategoryController;
