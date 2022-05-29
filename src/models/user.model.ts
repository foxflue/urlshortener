import { model, Schema } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required."],
  },
  domain: {
    type: String,
    required: [true, "Domain is required."],
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
