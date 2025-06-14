import { Router } from "express";
import * as controller from "./order.controller.js";
import { auth } from "../../middleware/authentication.js";
import { endpoints } from "./order.role.js";
import { validation } from "../../middleware/validation.js";
import {
  createOrder,
  updateOrderStatus,
  cancelOrder,
} from "./order.validation.js";
import { asyncHandler } from "../../utils/ErrorHandling.js";

const router = Router();

router.get("/all",
  auth(endpoints.getAllOrders), 
  asyncHandler(controller.getAllOrders));


router.post(
  "/create",
  auth(endpoints.createOrder),
  validation(createOrder),
  asyncHandler(controller.createOrder)
);

router.post(
  "/cancel",
  auth(endpoints.cancelOrder),
  validation(cancelOrder),
  asyncHandler(controller.cancelOrder)
);

router.put(
  "/update/status",
  auth(endpoints.updateOrderStatus),
  validation(updateOrderStatus),
  asyncHandler(controller.updateOrderStatus)
);

router.get("/user-orders", 
  auth(endpoints.getUserOrders),
  asyncHandler(controller.getUserOrders));

router.get("/user-orders/status", 
  auth(endpoints.getUserOrders),
  asyncHandler(controller.getUserOrders));
  

router.get("/all/status",
  auth(endpoints.getAllOrders), 
  asyncHandler(controller.getAllOrders)
);
export default router;