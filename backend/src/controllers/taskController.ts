import { Response } from 'express';
import { validationResult } from 'express-validator';
import { AuthRequest } from '../middleware/auth';
import { TaskModel, TaskQueryParams } from '../models/Task';

/**
 * Get all tasks for the authenticated user
 * Supports pagination and sorting by due date or priority
 * 
 * @route GET /api/tasks
 * @access Private (requires authentication)
 * @queryParams page, limit, sortBy (end_date|priority), sortOrder (asc|desc)
 */
export const getTasks = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    // Verify user is authenticated (userId should be set by auth middleware)
    if (!req.userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    // Parse query parameters for pagination and sorting
    const params: TaskQueryParams = {
      page: req.query.page ? parseInt(req.query.page as string) : 1,
      limit: req.query.limit ? parseInt(req.query.limit as string) : 10,
      sortBy: req.query.sortBy as 'end_date' | 'priority' | undefined,
      sortOrder: req.query.sortOrder as 'asc' | 'desc' | undefined,
    };

    // Fetch tasks from database with pagination and sorting
    const { tasks, total } = await TaskModel.findByUserId(req.userId, params);

    // Return tasks with pagination metadata
    res.json({
      tasks,
      pagination: {
        page: params.page || 1,
        limit: params.limit || 10,
        total,
        totalPages: Math.ceil(total / (params.limit || 10)),
      },
    });
  } catch (error: any) {
    console.error('Get tasks error:', error);
    res.status(500).json({ error: 'Failed to fetch tasks. Please try again later.' });
  }
};

/**
 * Create a new task for the authenticated user
 * Validates input and creates task in database
 * 
 * @route POST /api/tasks
 * @access Private (requires authentication)
 */
export const createTask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    // Check for validation errors from express-validator middleware
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    // Verify user is authenticated
    if (!req.userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    // Create task in database (user_id is set from authenticated user)
    const task = await TaskModel.create(req.userId, req.body);
    res.status(201).json({ message: 'Task created successfully', task });
  } catch (error: any) {
    console.error('Create task error:', error);
    // Handle Prisma foreign key constraint violation
    if (error.code === 'P2003') {
      res.status(400).json({ error: 'Invalid user reference. Please log in again.' });
      return;
    }
    res.status(500).json({ error: 'Failed to create task. Please try again later.' });
  }
};

/**
 * Update an existing task
 * Only the task owner can update their tasks
 * 
 * @route PUT /api/tasks/:id
 * @access Private (requires authentication)
 */
export const updateTask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    // Check for validation errors from express-validator middleware
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    // Verify user is authenticated
    if (!req.userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    // Parse task ID from URL parameters
    const taskId = parseInt(req.params.id);
    
    // Update task (model verifies ownership before updating)
    const task = await TaskModel.update(taskId, req.userId, req.body);

    if (!task) {
      res.status(404).json({ error: 'Task not found or you do not have permission to update it' });
      return;
    }

    res.json({ message: 'Task updated successfully', task });
  } catch (error: any) {
    console.error('Update task error:', error);
    // Handle Prisma record not found error
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Task not found or you do not have permission to update it.' });
      return;
    }
    res.status(500).json({ error: 'Failed to update task. Please try again later.' });
  }
};

/**
 * Delete a task
 * Only the task owner can delete their tasks
 * 
 * @route DELETE /api/tasks/:id
 * @access Private (requires authentication)
 */
export const deleteTask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    // Verify user is authenticated
    if (!req.userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    // Parse task ID from URL parameters
    const taskId = parseInt(req.params.id);
    
    // Delete task (model verifies ownership before deleting)
    const deleted = await TaskModel.delete(taskId, req.userId);

    if (!deleted) {
      res.status(404).json({ error: 'Task not found or you do not have permission to delete it' });
      return;
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (error: any) {
    console.error('Delete task error:', error);
    res.status(500).json({ error: 'Failed to delete task. Please try again later.' });
  }
};

