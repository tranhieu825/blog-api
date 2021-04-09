"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRoute_member = void 0;
const category_Controller_1 = require("../controllers/category.Controller");
const auth_middleware_1 = require("../../../../middlewares/auth.middleware");
class CategoryRoute_member {
    constructor() {
        this.categoryController = new category_Controller_1.CategoryController();
    }
    routes(app) {
        app
            .route("/blog/api/category")
            .get(auth_middleware_1.isAuth, this.categoryController.getAllCategory);
    }
}
exports.CategoryRoute_member = CategoryRoute_member;
