import mongoose from "mongoose";

const shapeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  weight: {
    type: String,
    required: true,
  },
  dimensions: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  d: {
    type: String,
    required: true,
  },
  viewBox: {
    type: String,
    required: true,
  },
  image: {
    secure_url: {
      type: String,
      required: true,
    },
    public_id: {
      type: String,
      required: true,
    },
  },
  flavors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Flavor",
  }],
  toppings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Topping",
  }],
});

export const shapeModel = mongoose.model("Shape", shapeSchema);