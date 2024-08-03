import express, { Request, Response } from 'express';
import {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} from '../controllers/tasks';

const router = express.Router();

router
  .route('/')
  .get((req: Request, res: Response) => getAllTasks(req, res))
  .post((req: Request, res: Response) => createTask(req, res));

router
  .route('/:id')
  .get((req: Request, res: Response) => getTask(req, res))
  .patch((req: Request, res: Response) => updateTask(req, res))
  .delete((req: Request, res: Response) => deleteTask(req, res));

export default router;
