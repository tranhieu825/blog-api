import mongoose from "mongoose";

import { IModelBase, SchemaBase } from "./common.model";
export const UserSchemaName = "User";

export enum RoleCode {
  Member = "member",
  Moderator = "moderator",
  Admin = "admin",
}
export interface IUser extends IModelBase {
    name: string,
    role: string,
    password: string;
    email: string;
    phone: number,
    subject: string,
    message: string,
}

const UserSchema = new mongoose.Schema(
  SchemaBase({
    name: {
      type: String,
      required: true,
    },
   role: {
      type: String,
      enum: [RoleCode.Admin, RoleCode.Member, RoleCode.Moderator],
      default: RoleCode.Member,
      required: true,
    },
   email: {
      type: String,
      required: true,
      match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    },
   phone: {
      type: Number,
      required: true,
    },
   subject: {
      type: String,
    },
   message: {
      type: String,
    },
   password: {
      type: String,
      required: true,
    },
  }),
);

export const User = mongoose.model<IUser>(UserSchemaName, UserSchema);
