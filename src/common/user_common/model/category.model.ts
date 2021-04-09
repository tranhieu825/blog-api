import mongoose from "mongoose";

import { IModelBase, SchemaBase } from "./common.model";
export const CategorySchemaName = "Category";

export interface ICategory extends IModelBase {
    title: string,
    user_id: string,
}

const CategorySchema = new mongoose.Schema(
  SchemaBase({
    title: {
      type: String,
      required: true,
    },
    user_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  }),
);

export const Category = mongoose.model<ICategory>(CategorySchemaName, CategorySchema);
