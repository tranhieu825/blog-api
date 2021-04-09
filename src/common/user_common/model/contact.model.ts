import mongoose from "mongoose";

import { IModelBase, SchemaBase } from "./common.model";
export const ContactSchemaName = "Contact";

export interface IContact extends IModelBase {
    name: string,
    email: string,
    phone: number,
    subject: string,
    message: string,
    user_id: string,
}

const ContactSchema = new mongoose.Schema(
  SchemaBase({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user"
   },

  }),
);

export const Contact = mongoose.model<IContact>(ContactSchemaName, ContactSchema);
