import { Router } from "express";
import * as controller from "./cart.controller.js";
import { auth } from "../../middleware/authentication.js";
import { endpoints } from "./cart.role.js";
import { validation } from "../../middleware/validation.js";
import { addToCart, removeFromCart } from "./cart.validation.js";
import { asyncHandler } from "../../utils/ErrorHandling.js";

const router = Router();

router.post(
  "/add",
  auth(endpoints.addToCart),
  validation(addToCart),
  asyncHandler(controller.addToCart)
);

router.post(
  "/remove",
  auth(endpoints.removeFromCart),
  validation(removeFromCart),
  asyncHandler(controller.removeFromCart)
);

router.get("/", 
  auth(endpoints.getCart),
  asyncHandler(controller.getCart));

router.delete("/clear", 
  auth(endpoints.clearCart),
  asyncHandler(controller.clearCart));

export default router;