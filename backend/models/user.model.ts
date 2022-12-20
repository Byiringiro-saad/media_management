import mongoose, { Schema } from "mongoose";

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
    required: true,
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

export default mongoose.model("User", userSchema);
