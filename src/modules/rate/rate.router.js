import { Router } from "express";
import * as controller from "./rate.controller.js";
import { auth } from "../../middleware/authentication.js";
import { endpoints } from "./rate.role.js";
import { validation } from "../../middleware/validation.js";
import {
  addReview,
  updateReview,
  deleteReview,
} from "./rate.validation.js";
import { asyncHandler } from "../../utils/ErrorHandling.js";
import fileUpload, { fileType } from "../../utils/multer.js";


const router = Router();


router.post(
  "/add",
  fileUpload(fileType.image).single('image'),
  auth(endpoints.addReview),
  validation(addReview),
  asyncHandler(controller.addReview)
);

router.put(
  "/update",
  fileUpload(fileType.image).single('image'),
  auth(endpoints.updateReview),
  validation(updateReview),
  asyncHandler(controller.updateReview)
);

router.delete(
  "/delete",
  auth(endpoints.deleteReview),
  validation(deleteReview),
  asyncHandler(controller.deleteReview)
);

router.get("/cake/:cakeId", 
  auth(endpoints.getCakeReviews),
  asyncHandler(controller.getCakeReviews));

export default router;