import mongoose, { Schema } from "mongoose";

//interface
import Media from "./media.interface";

const mediaSchema: Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  cloudinaryId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["private", "public"],
  },
  type: {
    type: String,
    required: true,
  },
  upvotes: {
    type: [mongoose.Schema.Types.ObjectId],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.model<Media & mongoose.Document>("Media", mediaSchema);
