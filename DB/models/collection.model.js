import mongoose, { Schema } from "mongoose";



const collectionSchema = new Schema({
    name: { type: String, required: true, unique: true },
    image: { type: Object, required: true },
    discount:{
        type: Number,
        min: 0,
        max: 100,
    },
    status:{
        type: String,
        enum: ["active", "inactive"],
        default: "active",
        required: true,
    }
})

export const cakeCollection = mongoose.model("cakeCollection", collectionSchema);