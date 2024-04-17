import { Router } from "express";
import { auth } from "../middlewares/auth.middlewares.js";
import { createComment, deleteComment } from "../controllers/comment.controller.js";

const router = Router();

router.route('/').post(auth,createComment).delete(auth,deleteComment);


export default router