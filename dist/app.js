"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const express_session_1 = __importDefault(require("express-session"));
const cors_1 = __importDefault(require("cors"));
// Xử lý route member
const user_routes_1 = require("./module/member_module/user_module/routes/user.routes");
const category_routes_1 = require("./module/member_module/category_module/routes/category.routes");
const post_routes_1 = require("./module/member_module/post_module/routes/post.routes");
const comment_routes_1 = require("./module/member_module/comment_module/routes/comment.routes");
const env_1 = require("./config/env");
// Xử lý route admin
const user_routes_2 = require("./module/admin_module/user_module/routes/user.routes");
const category_routes_2 = require("./module/admin_module/category_module/routes/category.routes");
const post_routes_2 = require("./module/admin_module/post_module/routes/post.routes");
const comment_routes_2 = require("./module/admin_module/comment_module/routes/comment.routes");
// Xử lý common
const common_routes_1 = require("./module/common_module/routes/common.routes");
class Applicaction {
    constructor() {
        // member
        this.memberRoute_member = new user_routes_1.MemberRoute_member();
        this.categoryRoute_member = new category_routes_1.CategoryRoute_member();
        this.postRoute_member = new post_routes_1.PostRoute_member();
        this.commentRoute_member = new comment_routes_1.CommentRoute_member();
        // Admin
        this.adminRoute_admin = new user_routes_2.AdminRoute_admin();
        this.categoryRoute_admin = new category_routes_2.CategoryRoute_admin();
        this.postRoute_admin = new post_routes_2.PostRoute_admin();
        this.commentRoute_admin = new comment_routes_2.CommentRoute_admin();
        // Common
        this.commonRoute = new common_routes_1.CommonRoute();
        this.app = express_1.default();
        this.settings();
        this.middlewares();
        this.routes();
    }
    settings() {
        this.app.set('port', 4000);
    }
    middlewares() {
        this.app.use(morgan_1.default('dev'));
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use(express_1.default.json());
        this.app.use(cors_1.default());
        this.app.use(express_session_1.default({
            name: env_1.SESS_NAME,
            secret: env_1.SESS_PASS,
            resave: false,
            saveUninitialized: true,
            // store: sessionStore,
            cookie: {
                maxAge: env_1.SESS_MAXAGE,
                sameSite: true,
                secure: false,
            }
        }));
    }
    routes() {
        // member
        this.memberRoute_member.routes(this.app);
        this.categoryRoute_member.routes(this.app);
        this.postRoute_member.routes(this.app);
        this.commentRoute_member.routes(this.app);
        // Common
        this.commonRoute.routes(this.app);
        // admin
        this.adminRoute_admin.routes(this.app);
        this.categoryRoute_admin.routes(this.app);
        this.postRoute_admin.routes(this.app);
        this.commentRoute_admin.routes(this.app);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('>>> Server is running at', this.app.get('port'));
        });
    }
}
exports.default = Applicaction;
