import Joi from "joi";
import { pagination } from "../../middleware/schemas.js";

export const updateCakeSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
  shape: Joi.string().hex().length(24).required(),
  flavor: Joi.string().hex().length(24).required(),
  topping: Joi.string().hex().length(24).required(),
  color: Joi.string().optional(),
  image: Joi.object({
    fieldname: Joi.string().required(),
    originalname: Joi.string().required(),
    encoding: Joi.string().required(),
    mimetype: Joi.string()
      .valid("image/png", "image/jpeg", "image/webp")
      .required(),
    destination: Joi.string().required(),
    filename: Joi.string().required(),
    path: Joi.string().required(),
    size: Joi.number().max(5000000).required(),
  }).optional(),
  cakeMessage: Joi.string().optional(),
  instructions: Joi.string().optional(),
  type: Joi.valid("custom", "system").required(),
});

export const customCakeSchema = Joi.object({
  shape: Joi.string().hex().length(24).required(),
  flavor: Joi.string().hex().length(24).required(),
  topping: Joi.string().hex().length(24).required(),
  color: Joi.string().optional().allow(""),
  cakeMessage: Joi.string().optional().allow(""),
  instructions: Joi.string().optional().allow(""),
  type: Joi.valid("custom", "system").required(),
  image: Joi.object({
    fieldname: Joi.string().required(),
    originalname: Joi.string().required(),
    encoding: Joi.string().required(),
    mimetype: Joi.string()
      .valid("image/png", "image/jpeg", "image/webp")
      .required(),
    destination: Joi.string().required(),
    filename: Joi.string().required(),
    path: Joi.string().required(),
    size: Joi.number().max(5000000).required(),
  }).required(),
});

export const deleteCustom = Joi.object({
  cakeId: Joi.string().hex().length(24).required(),
});

export const getCake = Joi.object({
  cakeId: Joi.string().hex().length(24).required(),
});
export const changeCakeStatusSchema = Joi.object({
  cakeId: Joi.string().hex().length(24).required(),
  status: Joi.string().valid("active", "inactive").required().messages({
    "any.only": "Status must be either active or inactive",
    "any.required": "Status is required",
  }),
});
