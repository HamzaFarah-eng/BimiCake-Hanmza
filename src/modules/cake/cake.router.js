import { Router } from "express";
import * as controller from "./cake.controller.js"
import { asyncHandler } from "../../utils/ErrorHandling.js";
import { auth } from "../../middleware/authentication.js";
import { endpoints } from "./cake.role.js";
import { validation } from "../../middleware/validation.js";
import { changeCakeStatusSchema, customCakeSchema, deleteCustom, getCake, updateCakeSchema } from "./cake.validation.js";
import fileUpload, { fileType } from "../../utils/multer.js";
const router = Router();


router.post('/custom/new', auth([endpoints.admin]), fileUpload(fileType.image).single('file'), validation(customCakeSchema), asyncHandler(controller.customCake));
router.get('/:cakeId', validation(getCake), asyncHandler(controller.getCake));

router.patch('/:cakeId/status', auth([endpoints.admin]), validation(changeCakeStatusSchema), asyncHandler(controller.changeCakeStatus))

router.put('/custom/:id', auth([endpoints.admin]), fileUpload(fileType.image).single("file"), validation(updateCakeSchema),  asyncHandler(controller.customCakeUpdate));
router.delete('/custom/delete/:cakeId',  auth([endpoints.admin]), validation(deleteCustom), asyncHandler(controller.deleteCustom));

export default router;