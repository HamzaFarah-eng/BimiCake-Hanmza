import Joi from "joi";
import { pagination } from "../../middleware/schemas.js";



export const createProduct = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    image: Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().valid('image/png', 'image/jpeg', 'image/webp').required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required(),
        size: Joi.number().max(5000000).required(),
    }).required(),
    price:Joi.number().positive().integer().required(),
    category: Joi.string().hex().length(24).required(),
    description: Joi.string().min(10).max(500).optional(),
})



export const getProduct = Joi.object({
    id: Joi.string().hex().length(24).required(),
})



export const getProducts = Joi.object({
    page: pagination.page,
    limit:pagination.limit
})