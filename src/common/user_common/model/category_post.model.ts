import mongoose from "mongoose";

import { IModelBase, SchemaBase } from "./common.model";
export const CategorypostSchemaName = "Categorypost";

export interface ICategorypost extends IModelBase {
    category_id: string,
    post_id: string,
}

const CategorypostSchema = new mongoose.Schema(
  SchemaBase({
    title: {
      type: String,
      required: true,
    },
    parent: {
      type: String,
      required: true,
    },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category"
   },
    post_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post"
    },
  }),

  {
    timestamps: true,
  }
);

export const Categorypost = mongoose.model<ICategorypost>(CategorypostSchemaName, CategorypostSchema);
