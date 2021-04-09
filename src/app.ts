import express from 'express';
import morgan from 'morgan';
const mongoose =  require("mongoose");
const bodyParser =  require("body-parser");
import exphbs from 'express-handlebars';
import path from 'path';
import session from "express-session";
import connectMongo from "connect-mongo";
import cors from "cors";

// Xử lý route member
import { MemberRoute_member } from './module/member_module/user_module/routes/user.routes';
import { CategoryRoute_member } from './module/member_module/category_module/routes/category.routes';
import { PostRoute_member } from './module/member_module/post_module/routes/post.routes';
import { CommentRoute_member } from './module/member_module/comment_module/routes/comment.routes';
import { SESS_NAME,SESS_PASS, SESS_MAXAGE } from "./config/env";

// Xử lý route admin
import { AdminRoute_admin } from './module/admin_module/user_module/routes/user.routes';
import { CategoryRoute_admin } from './module/admin_module/category_module/routes/category.routes';
import { PostRoute_admin } from './module/admin_module/post_module/routes/post.routes';
import { CommentRoute_admin } from './module/admin_module/comment_module/routes/comment.routes';

// Xử lý common
import { CommonRoute } from './module/common_module/routes/common.routes';

 class Applicaction {

    app: express.Application;

    // member
    public memberRoute_member: MemberRoute_member = new MemberRoute_member();
    public categoryRoute_member: CategoryRoute_member = new CategoryRoute_member();
    public postRoute_member: PostRoute_member = new PostRoute_member();
    public commentRoute_member: CommentRoute_member = new CommentRoute_member();

    // Admin
    public adminRoute_admin: AdminRoute_admin = new AdminRoute_admin();
    public categoryRoute_admin: CategoryRoute_admin = new CategoryRoute_admin();
    public postRoute_admin: PostRoute_admin = new PostRoute_admin();
    public commentRoute_admin: CommentRoute_admin = new CommentRoute_admin();

    // Common
    public commonRoute: CommonRoute = new CommonRoute();


    constructor() {
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
    }

    settings() {
        this.app.set('port', 4000);
    }

    middlewares() {
        this.app.use(morgan('dev'));
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(express.json());
        this.app.use(cors());


        this.app.use(
        session({
        name: SESS_NAME,
        secret: SESS_PASS,
        resave: false,
        saveUninitialized: true,
        // store: sessionStore,
        cookie: {
          maxAge: SESS_MAXAGE,
          sameSite: true,
          secure: false,
        }
      })
    );

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

    start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log('>>> Server is running at', this.app.get('port'));
        });
    }
}

export default Applicaction;