import { roles } from "../../middleware/authentication.js";

export const endpoints = {
  addToCart: [roles.user],
  removeFromCart: [roles.user],
  getCart: [roles.user],
  clearCart: [roles.user],
};