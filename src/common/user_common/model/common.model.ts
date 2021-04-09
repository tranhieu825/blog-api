import mongoose, { Document, SchemaDefinition } from "mongoose";
export const UserSchemaName = "User";
export const PostSchemaName = "Post";
export const CategorySchemaName = "Category";
export const CategorypostSchemaName = "Categorypost";
export const ContactSchemaName = "Contact";
export const CommentSchemaName = "Comment";

export enum StatusCode {
  Active = "active",
  Deactive = "deactive",
} 

export interface IModelBase extends Document {
  _id: string;
  status: string;
}

export function SchemaBase(schema: mongoose.SchemaDefinition) {
  const defaultSchema: SchemaDefinition = {
   
    status: {
      type: String,
      enum: [StatusCode.Active, StatusCode.Deactive],
      default: StatusCode.Active,
      required: true,
    },

    };

  return {
    ...schema,
    ...defaultSchema,
  };
}
