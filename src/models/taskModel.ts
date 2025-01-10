import { eq } from "drizzle-orm";
import { db } from "../db/index";
import { tasks, TaskStatusEnum } from "../db/schemas/tasks";
import { handleModelError } from "../utils/errorHandlers";

export const taskModel = {
  // get all tasks
  async getAllTasks() {
    try {
      const result = await db.select().from(tasks);
      return result;
    } catch (error) {
      handleModelError("Error in model: Fetch all tasks", error);
    }
  },

  // get a specific task
  async getTask(taskId: number) {
    try {
      const result = await db.select().from(tasks).where(eq(tasks.id, taskId));
      return result[0]; // as result is an array, we return the element here
    } catch (error) {
      handleModelError(`Error in model: Fetch task with ID ${taskId}`, error);
    }
  },

  // create a new task
  async createTask(
    title: string,
    description: string,
    status: TaskStatusEnum,
    created_by: number
  ) {
    try {
      const result = await db
        .insert(tasks)
        .values({
          title: title,
          description: description,
          status: status,
          created_by: created_by,
        })
        .returning();
      return result[0]; // as result is an array, we return the element here
    } catch (error) {
      handleModelError("Error in model: Create new task", error);
    }
  },

  // update an existing task
  async updateTask(
    taskId: number,
    title?: string,
    description?: string,
    status?: TaskStatusEnum
  ) {
    try {
      const result = await db
        .update(tasks)
        .set({
          ...(title && { title: title }), // if title is undefined, no need to change, otherwise providing key-value
          ...(description && { description: description }),
          ...(status && { status: status }),
        })
        .where(eq(tasks.id, taskId))
        .returning();
      return result[0]; // as result is an array, we return the element here
    } catch (error) {
      handleModelError(`Error in model: Update task with ID ${taskId}`, error);
    }
  },

  // delete an existing task
  async deleteTask(taskId: number) {
    try {
      const result = await db
        .delete(tasks)
        .where(eq(tasks.id, taskId))
        .returning();

      // throw error for deleting a non-existing task
      if (result.length === 0) {
        throw new Error(`Task ${taskId} not found`);
      }

      console.log(`Task ${taskId} deleted successfully!`);
      return result[0];
    } catch (error) {
      handleModelError(`Error in model: Delete task with ID ${taskId}`, error);
    }
  },
};
