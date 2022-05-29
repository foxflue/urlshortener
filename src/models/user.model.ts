import mongoose, { model, Schema } from "mongoose";

export interface UserDocument extends mongoose.Document{
  email: string,
  domain: string,
  roles: string[],
  apikey: string,
  limit: number,
  usages: number,
  createdAt: Date,
  updatedAt : Date
}

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
    },
    domain: {
      type: String,
      required: [true, "Domain is required."],
    },
    roles: {
      type: [String],
      enum: [
        "user_create",
        "user_delete",
        "user_view",
        "url_create",
        "url_view",
      ],
    },
    apikey: {
      type: String,
    },
    limit: {
      type: Number,
      default: 1000,
    },
    usages: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const UserModel = model<UserDocument>("users", userSchema);
