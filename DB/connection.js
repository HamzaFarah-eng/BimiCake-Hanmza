import mongoose from "mongoose";



export const connDB = async ()=>{
  await mongoose.connect(process.env.Mongo_URL).then(()=>{
    console.log("connected to db")
  }).catch(err=>{
    console.log(err)
  })
}