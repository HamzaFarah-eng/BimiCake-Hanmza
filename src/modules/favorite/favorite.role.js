import { roles } from "../../middleware/authentication.js";

export const endpoints = {
  addToFavorites: [roles.user],
  removeFromFavorites: [roles.user],
  getFavorites: [roles.user],
};