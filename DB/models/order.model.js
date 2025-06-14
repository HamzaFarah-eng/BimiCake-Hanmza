import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({

  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  items: [
    {
      cake: { type: mongoose.Schema.Types.ObjectId, ref: "Cake", required: true },
      quantity: { type: Number, required: true, min: 1 },
    },
  ],
  totalPrice: { type: Number, required: true, min: 0 },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected", "shipped", "delivered", "cancelled"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});


export const Order = mongoose.model("Order", orderSchema);


