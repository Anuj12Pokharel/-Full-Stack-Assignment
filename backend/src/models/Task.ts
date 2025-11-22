import prisma from '../config/database';
import { Task, Prisma } from '@prisma/client';

/**
 * Task priority levels
 */
export type Priority = 'low' | 'medium' | 'high';

export type { Task };

/**
 * Input interface for creating or updating a task
 */
export interface TaskInput {
  title: string;
  description?: string;
  priority?: Priority;
  end_date?: string; // ISO 8601 date string (YYYY-MM-DD)
}

/**
 * Query parameters for fetching tasks with pagination and sorting
 */
export interface TaskQueryParams {
  page?: number; // Page number (1-indexed)
  limit?: number; // Number of tasks per page
  sortBy?: 'end_date' | 'priority'; // Field to sort by
  sortOrder?: 'asc' | 'desc'; // Sort direction
}

/**
 * Task Model
 * Handles all database operations related to tasks
 * Uses Prisma ORM for type-safe database access
 */
export class TaskModel {
  /**
   * Create a new task for a user
   * 
   * @param userId - ID of the user creating the task
   * @param taskData - Task data (title, description, priority, end_date)
   * @returns Created task object
   */
  static async create(userId: number, taskData: TaskInput): Promise<Task> {
    const task = await prisma.task.create({
      data: {
        user_id: userId,
        title: taskData.title,
        description: taskData.description || null,
        priority: (taskData.priority || 'medium') as Priority,
        end_date: taskData.end_date ? new Date(taskData.end_date) : null,
      },
    });
    return task;
  }

  /**
   * Find all tasks for a specific user with pagination and sorting
   * Supports sorting by end_date or priority, with ascending/descending order
   * 
   * @param userId - ID of the user whose tasks to fetch
   * @param params - Query parameters for pagination and sorting
   * @returns Object containing tasks array and total count
   */
  static async findByUserId(
    userId: number,
    params: TaskQueryParams = {}
  ): Promise<{ tasks: Task[]; total: number }> {
    const page = params.page || 1;
    const limit = params.limit || 10;
    const skip = (page - 1) * limit;

    // Build orderBy clause based on sortBy parameter
    let orderBy: Prisma.TaskOrderByWithRelationInput = { created_at: 'desc' };

    // Sort by end date (ascending or descending)
    if (params.sortBy === 'end_date') {
      orderBy = {
        end_date: params.sortOrder === 'asc' ? 'asc' : 'desc',
      };
    } else if (params.sortBy === 'priority') {
      // Use raw SQL for efficient priority sorting with CASE statement
      // This ensures high priority (1) comes before medium (2) and low (3)
      const sortDirection = params.sortOrder === 'asc' ? 'ASC' : 'DESC';
      
      const tasks = await prisma.$queryRawUnsafe<Task[]>(
        `SELECT * FROM tasks
         WHERE user_id = $1
         ORDER BY 
           CASE priority
             WHEN 'high' THEN 1
             WHEN 'medium' THEN 2
             WHEN 'low' THEN 3
             ELSE 2
           END ${sortDirection}
         LIMIT $2 OFFSET $3`,
        userId,
        limit,
        skip
      );

      const totalResult = await prisma.$queryRawUnsafe<[{ count: number }]>(
        'SELECT COUNT(*)::int as count FROM tasks WHERE user_id = $1',
        userId
      );
      const total = totalResult[0].count;

      return { tasks, total };
    }

    const [tasks, total] = await Promise.all([
      prisma.task.findMany({
        where: { user_id: userId },
        orderBy,
        skip,
        take: limit,
      }),
      prisma.task.count({
        where: { user_id: userId },
      }),
    ]);

    return { tasks, total };
  }

  /**
   * Find a specific task by ID, ensuring it belongs to the user
   * 
   * @param id - Task ID
   * @param userId - User ID to verify ownership
   * @returns Task object or null if not found or doesn't belong to user
   */
  static async findById(id: number, userId: number): Promise<Task | null> {
    const task = await prisma.task.findFirst({
      where: {
        id,
        user_id: userId,
      },
    });
    return task;
  }

  /**
   * Update an existing task
   * Verifies task ownership before updating to prevent unauthorized access
   * 
   * @param id - Task ID to update
   * @param userId - User ID to verify ownership
   * @param taskData - Partial task data to update (only provided fields are updated)
   * @returns Updated task object or null if not found or unauthorized
   */
  static async update(
    id: number,
    userId: number,
    taskData: Partial<TaskInput>
  ): Promise<Task | null> {
    // First verify the task belongs to the user before updating (security check)
    const existingTask = await prisma.task.findFirst({
      where: { id, user_id: userId },
    });

    if (!existingTask) {
      return null;
    }

    const updateData: Prisma.TaskUpdateInput = {};

    if (taskData.title !== undefined) {
      updateData.title = taskData.title;
    }
    if (taskData.description !== undefined) {
      updateData.description = taskData.description || null;
    }
    if (taskData.priority !== undefined) {
      updateData.priority = taskData.priority as Priority;
    }
    if (taskData.end_date !== undefined) {
      updateData.end_date = taskData.end_date ? new Date(taskData.end_date) : null;
    }

    // If no fields to update, return existing task
    if (Object.keys(updateData).length === 0) {
      return existingTask;
    }

    try {
      // Update task in database
      const task = await prisma.task.update({
        where: { id },
        data: updateData,
      });
      return task;
    } catch (error) {
      // Task not found (shouldn't happen since we checked above, but handle gracefully)
      return null;
    }
  }

  /**
   * Delete a task
   * Verifies task ownership before deleting to prevent unauthorized deletion
   * 
   * @param id - Task ID to delete
   * @param userId - User ID to verify ownership
   * @returns true if deleted successfully, false if not found or unauthorized
   */
  static async delete(id: number, userId: number): Promise<boolean> {
    try {
      // First verify the task belongs to the user (security check)
      const task = await prisma.task.findFirst({
        where: { id, user_id: userId },
      });

      if (!task) {
        return false;
      }

      // Delete task from database
      await prisma.task.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}
