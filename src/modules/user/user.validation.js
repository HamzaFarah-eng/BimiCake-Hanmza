import Joi from 'joi';
import { pagination } from "../../middleware/schemas.js";


export const Schema = Joi.object({
    id:Joi.string().hex().length(24).required()
})


export const getUsers = Joi.object({
    page:pagination.page,
    limit:pagination.limit
})