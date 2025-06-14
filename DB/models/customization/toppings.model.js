import mongoose from "mongoose";

const toppingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image:{type:Object, required: true},
  cakeCollection:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "cakeCollection",
    required: true
  }
});

export default mongoose.model("Topping", toppingSchema);