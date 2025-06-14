import mongoose, { Schema } from "mongoose";

const Product = new Schema({
    name:{
        type:String,
        required: true,
        unique: true
    },
    image:{
        type: Object,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    description:{
        type: String,
    }
})


export const productModel = mongoose.model("Products", Product)