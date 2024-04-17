import { Router } from "express";
import { auth } from "../middlewares/auth.middlewares.js";
import { genrateAndsendOTP, getAssigntomeTask, getCurrentUser, getcreatedTask, loginWithOTP, loginWithPassword, logoutUser, refreshAccessToken, setPassword, updatePassword } from "../controllers/user.controller.js";


const router = Router();

router.route('/genrateOTP').get(genrateAndsendOTP)

router.route('/login-with-password').post(loginWithPassword)
router.route('/set-password').patch(setPassword)
router.route('/login-with-otp').post(loginWithOTP)
router.route('/refresh-access-token').get(auth, refreshAccessToken)
router.route('/update-password').patch(auth, updatePassword)
router.route('/logout').post(auth, logoutUser)
router.route('/getcreatedTask').get(auth, getcreatedTask)
router.route('/getAssigntomeTask').get(auth, getAssigntomeTask)
router.route('/getCurrentUser').get(auth, getCurrentUser)





export default router;








