import mongoose from "mongoose";

const writeSchema = new mongoose.Schema({
  writing: { type: String, required: true },
  image: { type: String },
});

export const writeModel = mongoose.model("Write", writeSchema);