import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },  // Changed from "User" to "user"
  cake: { type: mongoose.Schema.Types.ObjectId, ref: "Cake", required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, maxlength: 500 },
  createdAt: { type: Date, default: Date.now },
  isDeleted:{type:Boolean , default: false },
  image: {
    secure_url: { type: String },
    public_id: { type: String },
  }
});

reviewSchema.index({ user: 1, cake: 1 }, { unique: true });

export const Review = mongoose.model("Review", reviewSchema);
