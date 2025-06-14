import { roles } from "../../middleware/authentication.js";

export const endpoints = {
  createOrder: [roles.user, roles.admin],///////////////////////////////////////////////////just roles.user
  updateOrderStatus: [roles.admin],
  getUserOrders: [roles.user, roles.admin],
  getAllOrders: [roles.admin],
  cancelOrder: [roles.user, roles.admin],
};