import Joi from "joi";

export const createOrder = Joi.object({
  items: Joi.array()
    .items(
      Joi.object({
        cake: Joi.string().hex().length(24).required(),
        quantity: Joi.number().min(1).required(),
      })
    )
    .min(1)
    .required(),
    userId: Joi.string().required()
});

export const updateOrderStatus = Joi.object({
  orderId: Joi.string().hex().length(24).required(),
  status: Joi.string()
    .valid("pending", "accepted", "rejected", "shipped", "delivered", "cancelled")
    .required(),
});

export const cancelOrder = Joi.object({
  orderId: Joi.string().hex().length(24).required(),
});