import {Router} from 'express'
import { asyncHandler } from '../../utils/ErrorHandling.js';
import * as controller from './product.controller.js';
import fileUpload, { fileType } from "../../utils/multer.js";
import { validation } from '../../middleware/validation.js';
import { createProduct, getProduct, getProducts } from './product.validation.js';
import { auth } from '../../middleware/authentication.js';
import { endpoints } from './product.role.js';

const router = Router();


router.post('/', auth([endpoints.admin]),fileUpload(fileType.image).single('image'), validation(createProduct), asyncHandler(controller.createProduct))
router.get('/:id', validation(getProduct), asyncHandler(controller.getProduct));
router.get('/', validation(getProducts), asyncHandler(controller.getProductList))
export default router;