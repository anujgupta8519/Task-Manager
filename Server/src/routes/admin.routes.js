import { Router } from "express";
import { adminLoginController, adminLogoutController, deleteProfile, getAllUsers, registerUser, updateProfile } from "../controllers/admin.controller.js";
import { isAdmin } from "../middlewares/isAdmin.middlewares.js";

const router = Router();

router.route("/login").post(adminLoginController);

router.route("/user").post(isAdmin, registerUser).patch(isAdmin, updateProfile).delete(isAdmin, deleteProfile)

router.route("/logout").post(isAdmin, adminLogoutController)
router.route("/users").get(isAdmin, getAllUsers)



export default router;

