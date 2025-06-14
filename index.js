import express from "express"
import "dotenv/config.js"
import { Appinit } from "./src/Appinit.js";

const app = express();

const PORT = process.env.PORT;

Appinit(express, app)
app.listen (PORT, ()=>{
  console.log(`server is running on port ${PORT}`)
})