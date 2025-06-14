import mongoose from "mongoose" ;

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [{
    cake: { type: mongoose.Schema.Types.ObjectId, ref: "Cake", required: true },
    name: { type: String, required: true },
    flavor: { name: { type: String, required: true } },
    topping: { name: { type: String, required: true } },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 1 },
    image: { type: String, required: true },
  }],
  cardMessage: { type: String, default: "" },
  totalPrice: { type: Number, required: true, min: 0 },
  createdAt: { type: Date, default: Date.now },
});


export const Cart = mongoose.model("Cart", cartSchema);
