import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  cakes: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Cake", required: true },
  ],
  createdAt: { type: Date, default: Date.now },
});

// Ensure a user cannot add the same cake to favorites multiple times
favoriteSchema.index({ user: 1, cakes: 1 }, { unique: true });

export const Favorite = mongoose.model("Favorite", favoriteSchema);
