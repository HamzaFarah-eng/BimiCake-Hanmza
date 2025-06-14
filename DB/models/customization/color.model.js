import mongoose from "mongoose";

const colorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  hexFormat: { type: String, required: true}
});

export const colorModel = new mongoose.model("Color", colorSchema);