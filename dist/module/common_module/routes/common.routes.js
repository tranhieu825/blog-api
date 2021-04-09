"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonRoute = void 0;
const common_Controller_1 = require("../controllers/common.Controller");
const auth_middleware_1 = require("../../../middlewares/auth.middleware");
class CommonRoute {
    constructor() {
        this.commonController = new common_Controller_1.CommonController();
    }
    routes(app) {
        // Phân trang chính
        app
            .route("/blog/api/page/:page_id")
            .get(auth_middleware_1.isAuth, this.commonController.getPerPage);
        // Phân trang theo category
        app
            .route("/blog/api/category/:category_id/page/:page_id")
            .get(auth_middleware_1.isAuth, this.commonController.getPerPageCategory);
        // Search
        app
            .route("/blog/api/search/:page_id")
            .get(auth_middleware_1.isAuth, this.commonController.getAllSearch);
    }
}
exports.CommonRoute = CommonRoute;
