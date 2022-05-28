import mongoose, { model, Schema } from "mongoose";

const urlSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  longUrl: {
    type: String,
  },
  domain: {
    type: String,
    required: true,
  },
  shortId: {
    type: String,
    required: true,
  },
});

export const UrlModel = model("UrlModel", urlSchema);
