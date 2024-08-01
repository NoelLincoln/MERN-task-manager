import { Request, Response } from 'express';
import Task from '../models/Task';

// Define types for the Task model if needed
interface TaskType {
  _id: string;
  name: string;
  completed: boolean;
}

export const getAllTasks = async (req: Request, res: Response): Promise<Response> => {
  try {
    const tasks = await Task.find({});
    return res.status(200).json({ tasks });
  } catch (error: unknown) {
    // Type assertion for error
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return res.status(500).json({ msg: errorMessage });
  }
};

export const createTask = async (req: Request, res: Response): Promise<Response> => {
  try {
    const task = await Task.create(req.body);
    return res.status(201).json({ task });
  } catch (error: unknown) {
    // Type assertion for error
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return res.status(500).json({ msg: errorMessage });
  }
};

export const getTask = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id: taskId } = req.params;
    const task = await Task.findOne({ _id: taskId });
    if (!task) {
      return res.status(404).json({ msg: `No task with id: ${taskId}` });
    }
    return res.status(200).json({ task });
  } catch (error: unknown) {
    // Type assertion for error
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return res.status(500).json({ msg: errorMessage });
  }
};

export const deleteTask = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id: taskId } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskId });
    if (!task) {
      return res.status(404).json({ msg: `No task with id: ${taskId}` });
    }
    return res.send('Task deleted');
  } catch (error: unknown) {
    // Type assertion for error
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return res.status(500).json({ msg: errorMessage });
  }
};

export const updateTask = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id: taskId } = req.params;
    const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res.status(404).json({ msg: `No task with id: ${taskId}` });
    }
    return res.status(200).json({ task });
  } catch (error: unknown) {
    // Type assertion for error
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return res.status(500).json({ msg: errorMessage });
  }
};
