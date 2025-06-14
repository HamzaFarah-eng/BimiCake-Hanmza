import { Router } from "express";
import * as controller from './collections.controller.js'
import fileUpload, { fileType } from "../../utils/multer.js";
import { validation } from "../../middleware/validation.js";
import { addCollection, addDiscount, changeStatus, deleteCollection, getAll, getCakesByCollectionSchema, updateCollection } from "./collectiocs.validation.js";
import { auth } from "../../middleware/authentication.js";
import { endpoints } from "./collections.role.js";
import { asyncHandler } from "../../utils/ErrorHandling.js";
const router = Router();


router.post('/', auth([endpoints.admin]), fileUpload(fileType.image).single('image'),validation(addCollection), asyncHandler(controller.addCollection));


router.get('/',  validation(getAll), asyncHandler(controller.getAllCollections));
router.get('/all', asyncHandler(controller.getCollections));
router.get('/collections-with-cakes', asyncHandler(controller.getCollectionsWithCakes));
router.get(
  '/collection/:collectionId/cakes',
  validation(getCakesByCollectionSchema),
  asyncHandler(controller.getCakesByCollection)
);

router.get('/:id', auth([endpoints.admin]), asyncHandler(controller.getById));



router.patch('/:id', auth([endpoints.admin]), validation(updateCollection), asyncHandler(controller.updateCollection));
router.delete('/:id', auth([endpoints.admin]), validation(deleteCollection), asyncHandler(controller.deleteCollection));
router.put('/:id', auth([endpoints.admin]), validation(changeStatus), asyncHandler(controller.changeStatus));
router.put('/discount/:id', auth([endpoints.admin]), validation(addDiscount), asyncHandler(controller.addDiscount));
export default router;