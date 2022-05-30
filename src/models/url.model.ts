import mongoose, { model, Schema } from "mongoose";
import { UserDocument } from "./user.model";

export interface UrlDocument extends mongoose.Document{
  shortId: string,
  longUrl: string,
  userID: UserDocument['_id'],
  domain: string,
  createdAt: Date,
  updatedAt : Date
}

const urlSchema = new Schema(
  {
    shortId: {
      type: String,
      required: [true, "Short ID is required."],
      unique: [true, "Short ID is already taken."],
    },
    longUrl: {
      type: String,
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    domain: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

urlSchema.index({ shortId: 1 });

export const UrlModel = model<UrlDocument>("urls", urlSchema);
