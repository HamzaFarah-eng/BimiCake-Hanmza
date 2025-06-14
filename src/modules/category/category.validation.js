import Joi from "joi";
import { pagination } from "../../middleware/schemas.js";



export const createCategory = Joi.object({
    name:Joi.string().min(3).max(50).required()
})


export const getCategory = Joi.object({
    id: Joi.string().hex().length(24).required(),
})


export const updateCate = Joi.object({
    id: Joi.string().hex().length(24).required(),
    name: Joi.string().min(3).max(50).required()
})


export const getCategories = Joi.object({
    page:pagination.page,
    limit:pagination.limit
})