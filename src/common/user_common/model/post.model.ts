import mongoose from "mongoose";

import { IModelBase, SchemaBase } from "./common.model";
export const PostSchemaName = "Post";

export interface IPost extends IModelBase {
    title: string,
    content: string,
    category_id: string,
    view: number,
    user_id: string,
}

const PostSchema = new mongoose.Schema(
  SchemaBase({
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category"
    },
    view: {
      type: Number,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
   },

  }),
   {
     timestamps: true,
   }
);
PostSchema.index({"title": "text", "content": "text"});
export const Post = mongoose.model<IPost>(PostSchemaName, PostSchema);
