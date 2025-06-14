import Joi from "joi";
import { pagination } from "../../middleware/schemas.js";

export const addCollection = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    image:  Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().valid('image/png', 'image/jpeg', 'image/webp').required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required(),
        size: Joi.number().max(5000000).required(),
    }).required(),
    discount: Joi.number().positive().min(0).max(100),
})

export const updateCollection = Joi.object({
    name: Joi.string().min(3).max(50).optional(),
    image: Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().valid('image/png', 'image/jpeg', 'image/webp').required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required(),
        size: Joi.number().max(5000000).required(),
    }).optional(),
    discount: Joi.number().positive().min(0).max(100).optional(),
    id: Joi.string().hex().length(24).required(),
})


export const deleteCollection = Joi.object({
    id: Joi.string().hex().length(24).required(),
})

export const changeStatus = Joi.object({
    id: Joi.string().hex().length(24).required(),
    status: Joi.string().valid("active", "inactive").required(),
})


export const addDiscount = Joi.object({
    id: Joi.string().hex().length(24).required(),
    discount: Joi.number().positive().min(0).max(100).required(),
})


export const getAll = Joi.object({
    page:pagination.page,
    limit:pagination.limit
})

export const getCakesByCollectionSchema = Joi.object({
  collectionId: Joi.string().hex().length(24).required(),
  page: pagination.page,
  limit: pagination.limit,
});