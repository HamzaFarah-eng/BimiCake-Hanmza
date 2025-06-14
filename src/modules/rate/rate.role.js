import { roles } from "../../middleware/authentication.js";

export const endpoints = {
  addReview: [roles.user],
  updateReview: [roles.user],
  deleteReview: [roles.user],
  getCakeReviews: [roles.user, roles.admin],
};