import { Router } from "express";
import * as controller from './user.controller.js'
import { asyncHandler } from "../../utils/ErrorHandling.js";
import {validation} from '../../middleware/validation.js';
import { getUsers, Schema } from "./user.validation.js";
import { auth } from "../../middleware/authentication.js";
import { endpoints } from "./user.role.js";

const router = Router();

router.get('/',auth([endpoints.admin]), validation(getUsers), asyncHandler(controller.getUsers))
router.get('/:id', auth([endpoints.admin]), validation(Schema), asyncHandler(controller.getUser))
router.patch('/:id', auth([endpoints.admin]), validation(Schema), asyncHandler(controller.disactiveUser))
export default router;