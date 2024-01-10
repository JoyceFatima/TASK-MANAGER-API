import { Router } from "express";
import {
  deleteAllTasks,
  deleteTask,
  getAllTasks,
  patchTask,
  postTask,
  putTask,
} from "../controllers/Http/taskController";
const router = Router();

router.get("/", getAllTasks);

router.post("/", postTask);

router.put("/:id", putTask);

router.delete("/:id", deleteTask);

router.delete("/", deleteAllTasks);

router.patch("/:id/complete", patchTask);

module.exports = router;
