import { Router } from 'express';
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from '../controllers/taskController';
import { authenticateToken } from '../middleware/auth';
import { taskValidation, taskUpdateValidation } from '../middleware/validation';

const router = Router();

// All task routes require authentication
router.use(authenticateToken);

router.get('/', getTasks);
router.post('/', taskValidation, createTask);
router.put('/:id', taskUpdateValidation, updateTask);
router.delete('/:id', deleteTask);

export default router;

