import { validationSchemas } from "../modules/customization/custom.validation.js"
import { validation } from "./validation.js"

export const pickSchema = ()=>{
  return (req,res,next) => {
    const {type} = req.params
    if(!type){
      return next(new AppError("type is required", 400))
    }
    const schema = validationSchemas[type]
    validation(schema);
    next()
  }
}