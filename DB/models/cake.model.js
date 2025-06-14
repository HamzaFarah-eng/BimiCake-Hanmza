import mongoose from "mongoose";

const cakeSchema = new mongoose.Schema({
  shape: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shape",
    required: true,
  },
  flavor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Flavor",
    required: true,
  },
  topping: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Topping",
    required: true,
  },
  color: String,
  cakeMessage: String,
  file: {
    secure_url: {
      type: String,
      required: true,
    },
    public_id: {
      type: String,
      required: true,
      
    },
  },
  instructions: String,
  price: { type: Number, required: true},
  discount: {
    type: Number,
  },
  status: {
    type: String,
    default: "active",
    enum: ["active", "inactive"],
  },
  cakeCollection: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "cakeCollection",
    required: true,
  },
  type: {
    type: String,
    enum: ["custom", "system"],
    required: true,
  },
});

export const Cake = mongoose.model("Cake", cakeSchema);
