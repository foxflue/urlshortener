import mongoose, { model, Schema } from "mongoose";

const urlSchema = new Schema(
  {
    shortId: {
      type: String,
      required: [true, "Short ID is required."],
      unique: [true, "Short ID is already taken."],
    },
    longUrl: {
      type: String,
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

export const UrlModel = model("urls", urlSchema);
