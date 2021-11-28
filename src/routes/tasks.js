import { Router } from "express";
import { createTask, deleteTask, getOneTask, getTasks, getTasksByProject, updateTask } from "../controllers/task";

const router = Router();

router.post('/', createTask);
router.get('/', getTasks);
router.delete('/:id', deleteTask);
router.put('/:id', updateTask);
router.get('/:id', getOneTask);
router.get('/project/:projectid', getTasksByProject);

export default router;