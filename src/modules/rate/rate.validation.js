import Joi from "joi";

export const addReview = Joi.object({
  cakeId: Joi.string().hex().length(24).required(),
userId: Joi.string().hex().length(24).optional(), 
  rating: Joi.number().min(1).max(5).required(),
  comment: Joi.string().max(500).optional(),
  image: Joi.object({
    fieldname: Joi.string().required(),
    originalname: Joi.string().required(),
    encoding: Joi.string().required(),
    mimetype: Joi.string().valid('image/png', 'image/jpeg', 'image/webp').required(),
    destination: Joi.string().required(),
    filename: Joi.string().required(),
    path: Joi.string().required(),
    size: Joi.number().max(5000000).required(),
  }).optional()
});

export const updateReview = Joi.object({
  id: Joi.string().hex().length(24).required(),
  rating: Joi.number().min(1).max(5).required(),
  comment: Joi.string().max(500).optional(),
  image: Joi.object({
    fieldname: Joi.string().required(),
    originalname: Joi.string().required(),
    encoding: Joi.string().required(),
    mimetype: Joi.string().valid('image/png', 'image/jpeg', 'image/webp').required(),
    destination: Joi.string().required(),
    filename: Joi.string().required(),
    path: Joi.string().required(),
    size: Joi.number().max(5000000).required(),
  }).optional()
});

export const deleteReview = Joi.object({
  reviewId: Joi.string().hex().length(24).required(),
});