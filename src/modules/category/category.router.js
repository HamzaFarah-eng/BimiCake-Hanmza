import { Router } from "express";
import { auth } from "../../middleware/authentication.js";
import { endpoints } from "./category.role.js";
import { validation } from "../../middleware/validation.js";
import { createCategory, getCategories, getCategory, updateCate } from "./category.validation.js";
import { asyncHandler } from "../../utils/ErrorHandling.js";
import * as controller from './category.controller.js'

const router =  Router();


router.post('/',  validation(createCategory), asyncHandler(controller.createCategory));
router.get('/',validation(getCategories), asyncHandler(controller.getAllCategories));
router.get('/:id', validation(getCategory), asyncHandler(controller.getCategory));
router.put('/:id', auth([endpoints.admin]), validation(updateCate), asyncHandler(controller.updateCategory));
router.delete('/:id',auth([endpoints.admin]),  validation(getCategory) , asyncHandler(controller.deleteCategory))

export default router