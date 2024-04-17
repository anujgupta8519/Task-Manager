import { Router } from "express";
import { auth } from "../middlewares/auth.middlewares.js";
import { createTask, deletetask, gettask, markasCompleted, updatetask } from "../controllers/task.controller.js";

const router = Router();

router.route('/:id').get(auth,gettask).delete(auth,deletetask).put(auth,updatetask).patch(auth,markasCompleted)
router.route('/').post(auth,createTask)


export default router