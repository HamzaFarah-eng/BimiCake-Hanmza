import mongoose from "mongoose";

const flavorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image:{type:Object, required: true}
});

export const Flavor = mongoose.model("Flavor", flavorSchema);