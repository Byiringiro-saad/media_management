import mongoose, { Schema } from "mongoose";

//interface
import User from "./user.interface";

const userSchema: Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  medias: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Media",
    default: [],
  },
  usedGoogle: {
    type: Boolean,
    required: true,
  },
});

export default mongoose.model<User & mongoose.Document>("User", userSchema);
