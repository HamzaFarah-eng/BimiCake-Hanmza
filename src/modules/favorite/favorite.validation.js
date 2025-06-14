import Joi from "joi";

export const addToFavorites= Joi.object({
  cakeId: Joi.string().hex().length(24).required(),
  userId: Joi.string().required(),
});

export const removeFromFavorites = Joi.object({
  cakeId: Joi.string().hex().length(24).required(),
  userId: Joi.string().required(),
});
