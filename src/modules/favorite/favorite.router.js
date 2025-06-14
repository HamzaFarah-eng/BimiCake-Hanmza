import { Router } from "express";
import * as controller from "./favorite.controller.js";
import { auth } from "../../middleware/authentication.js";
import { endpoints } from "./favorite.role.js";
import { validation } from "../../middleware/validation.js";
import { addToFavorites, removeFromFavorites} from "./favorite.validation.js";
import { asyncHandler } from "../../utils/ErrorHandling.js";

const router = Router();

router.post(
  "/add",
  auth(endpoints.addToFavorites),
  validation(addToFavorites),
  asyncHandler(controller.addToFavorites)
);

router.post(
  "/remove",
  auth(endpoints.removeFromFavorites),
  validation(removeFromFavorites),
  asyncHandler(controller.removeFromFavorites)
);

router.get("/", 
  auth(endpoints.getFavorites),
  asyncHandler(controller.getFavorites));

export default router;