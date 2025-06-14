import express from "express";
import * as controller from './custom.controller.js'
import { asyncHandler } from "../../utils/ErrorHandling.js";
import { pickSchema } from "../../middleware/customMiddleware.js";
import fileUpload, { fileType } from "../../utils/multer.js";
import { endpoints } from "./custom.role.js";
import { auth } from "../../middleware/authentication.js";
import { validation } from "../../middleware/validation.js";
import { deleteItem, getToppings, getType, linkCustomizationsToShape } from "./custom.validation.js";

const router = express.Router();

// Routes for Shape, Flavor, Color, Toppings
router.post("/:type", auth([endpoints.admin]), fileUpload(fileType.image).single('image'), pickSchema(), asyncHandler(controller.addItem));
router.delete("/:type/:id", auth([endpoints.admin]), validation(deleteItem), asyncHandler(controller.deleteItem));
router.get("/:type", auth([endpoints.admin]), validation(getType), asyncHandler(controller.getItemsForCustom));
router.get('/toppings/:cakeCollection', auth([endpoints.admin]), validation(getToppings), asyncHandler(controller.getToppingsByCollection));

router.get("/shapes/options", asyncHandler(controller.getShapesWithOptions));

// ✅ NEW ROUTE for linking flavors + toppings to a shape
router.patch(
  "/shapes/:shapeId/add-customization",
  auth([endpoints.admin]),
  validation(linkCustomizationsToShape),
  asyncHandler(controller.addFlavorsAndToppingsToShape)
);

export default router;
