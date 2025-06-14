import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
  username:{
    type:String,
    required:true,
    minlength:3,
    maxlength:50
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true,
    minlength:8,
  },
  phone:{
    type:String,
    required:true,
    unique:true
  },
  role:{
    type:String,
    enum:['user', 'admin'],
    default:'user'
  },
  status:{
    type:String,
    enum:['active', 'inactive'],
    default:'active'
  },
  code:{
    type:String,
  },
  expiryDate:{
    type:Date,
  },
  confirmEmail:{
    type:Boolean,
    default:false
  },
  birthdate:{
    type: Date,
    required:true,
    validate:{
      validator: function(v) {
        return v < new Date();
      },
      message: "Date of birth must be in the past"
    }
  }
})

export const userModel = new mongoose.model('user', userSchema);
