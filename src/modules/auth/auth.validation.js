import Joi from "joi";
import { phoneValidation } from "../../middleware/schemas.js";

export const registerSch = Joi.object({
  username:Joi.string().min(3).max(50).required(),
  email:Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  phone:phoneValidation,
  birthdate:Joi.date().iso().required(),
  role:Joi.string().valid("admin","user").default("user")
})

// '2002-05-15' => iso format

export const loginSch = Joi.object({
  phone: phoneValidation,
  password: Joi.string().required(),
});


export const forgotPassword = Joi.object({
  password:Joi.string().min(8).required(),
  code:Joi.string().length(4).required()
})


export const sendCode = Joi.object({
  email: Joi.string().email().required()
})

export const confirmEmail = Joi.object({
  token: Joi.string().required()
})


export const updateProfile = Joi.object({
  username:Joi.string().min(3).max(50).optional(),
  birthdate:Joi.date().iso().optional(),
})

export const changePassword = Joi.object({
  oldPassword: Joi.string().min(8).required(),
  newPassword: Joi.string().min(8).required()
})
