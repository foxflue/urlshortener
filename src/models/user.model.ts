import { model, Schema } from "mongoose";

const userSchema = new Schema({
  siteUrl: {
    type: String,
    required: true,
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
});

export const UserModel = model("UserModel", userSchema);
