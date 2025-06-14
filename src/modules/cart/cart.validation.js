import Joi from "joi";

export const addToCart = Joi.object({
  cakeId: Joi.string().hex().length(24).required(),
  quantity: Joi.number().min(1).required(),
  userId: Joi.string().length(24).required()
});

export const removeFromCart = Joi.object({
  cakeId: Joi.string().hex().length(24).required(),
  userId: Joi.string().required()
});