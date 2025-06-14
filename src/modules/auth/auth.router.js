import { Router } from "express";
import * as constroller from './auth.controller.js';
import { validation } from "../../middleware/validation.js";
import { changePassword, confirmEmail, forgotPassword, loginSch, registerSch, sendCode, updateProfile } from "./auth.validation.js";
import { auth } from "../../middleware/authentication.js";
import { asyncHandler } from "../../utils/ErrorHandling.js";
import { endpoints } from "./auth.role.js";

const router = Router();

router.post('/register', validation(registerSch), asyncHandler(constroller.register));
router.post('/login',validation(loginSch), constroller.login);
router.post('/forgot-password', auth([endpoints.admin, endpoints.user]), validation(forgotPassword), asyncHandler(constroller.forgotPassword));
router.post('/send-code',validation(sendCode), constroller.sendCode);
router.get("/profile", auth([endpoints.admin, endpoints.user]), asyncHandler(constroller.getProfile))
router.get('/confirm/:token',validation(confirmEmail), asyncHandler(constroller.confirmEmail));
router.put('/profile', auth([endpoints.admin, endpoints.user ]), validation(updateProfile), asyncHandler(constroller.updateProfile));
router.put("/change-password", auth([endpoints.admin, endpoints.user ]), validation(changePassword), asyncHandler(constroller.changePassword))
export default router;