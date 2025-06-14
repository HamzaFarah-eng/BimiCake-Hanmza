import mongoose, { Schema } from "mongoose";


const category = new Schema({
    name: { type: String, required: true, unique: true },
})


export const categoryModel = mongoose.model('Category', category);