import mongoose from "mongoose";

const linkSchema = new mongoose.Schema(
  {
    link: {
      type: String,
      required: true,
      trim: true,
    },
    shortLink: {
      type: String,
      required: true,
      unique: true,
    },
    uid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Link = mongoose.model("Link", linkSchema);
