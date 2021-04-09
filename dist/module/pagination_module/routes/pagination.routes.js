"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationRoute = void 0;
const pagination_Controller_1 = require("../controllers/pagination.Controller");
const auth_middleware_1 = require("../../../middlewares/auth.middleware");
class PaginationRoute {
    constructor() {
        this.paginationController = new pagination_Controller_1.PaginationController();
    }
    routes(app) {
        // Phân trang chính
        app
            .route("/blog/api/page/:page_id")
            .get(auth_middleware_1.isAuth, this.paginationController.getPerPage);
        // Phân trang theo category
        app
            .route("/blog/api/category/:category_id/page/:page_id")
            .get(auth_middleware_1.isAuth, this.paginationController.getPerPageCategory);
    }
}
exports.PaginationRoute = PaginationRoute;
