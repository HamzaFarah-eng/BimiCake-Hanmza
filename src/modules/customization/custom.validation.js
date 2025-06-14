import Joi from "joi";
import { pagination } from "../../middleware/schemas.js";

export const shapeSchema = Joi.object({
  name: Joi.string().required(),
  capacity: Joi.number().required(),
  weight: Joi.string().required(),
  dimensions: Joi.string().required(),
  price: Joi.number().required(),
  d: Joi.string().required(),
  viewBox: Joi.string().required(),
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

const flavorSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
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

const colorSchema = Joi.object({
  name: Joi.string().required(),
});

const toppingSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
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
  cakeCollection:Joi.string().hex().length(24).required(),
});

export const validationSchemas = {
  shape: shapeSchema,
  flavor: flavorSchema,
  color: colorSchema,
  topping: toppingSchema,
};

const validTypes = ["shape", "topping", "flavor", "color"];

export const getToppings = Joi.object({
  page: pagination.page,
  limit: pagination.limit,
  cakeCollection: Joi.string().hex().length(24).required(),
});

export const deleteItem = Joi.object({
  id: Joi.string().hex().length(24).required(),
  type: Joi.string()
    .valid(...validTypes)
    .required(),
});

export const getType = Joi.object({
  type: Joi.string()
    .valid(...validTypes)
    .required(),
});

export const linkCustomizationsToShape = Joi.object({
  shapeId: Joi.string().hex().length(24).required(),
  flavorIds: Joi.array()
    .items(Joi.string().hex().length(24).required())
    .min(1)
    .required(),
  toppingIds: Joi.array()
    .items(Joi.string().hex().length(24).required())
    .min(1)
    .required(),
});
