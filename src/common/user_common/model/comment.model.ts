import mongoose from "mongoose";

import { IModelBase, SchemaBase } from "./common.model";
export const CommentSchemaName = "Comment";

export interface IComment extends IModelBase {
    post_id: string,
    user_id: string,
    content: string,
}

const CommentSchema = new mongoose.Schema(
  SchemaBase({
    content: {
      type: String,
      required: true,
    },
    user_id: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
   }],
    post_id: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post"
   }],

  }),

    {
     timestamps: true,
   }

);

export const Comment = mongoose.model<IComment>(CommentSchemaName, CommentSchema);
