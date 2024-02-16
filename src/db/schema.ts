import mongoose from "mongoose";
import { generateSeed } from "../core/fairness/generateSeed";
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  nonce: {
    type: Number,
    default: 1,
  },
  serverSeed: {
    type: String,
    default: generateSeed(64),
  },
  clientSeed: {
    type: String,
    default: generateSeed(5),
  },
});

export const User = mongoose.model("User", userSchema);
