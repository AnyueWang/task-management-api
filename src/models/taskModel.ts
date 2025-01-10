import { eq } from "drizzle-orm";
import { db } from "../db/index";
import { tasks, TaskStatusEnum } from "../db/schemas/tasks";

export const taskModel = {
  // get all tasks
  async getAllTasks() {
    try {
      const result = await db.select().from(tasks);
      return result;
    } catch (error) {
      console.error("Error fetching all tasks: ", error);
      throw new Error("Failed to fetch tasks");
    }
  },

  // get a specific task
  async getTask(taskId: number) {
    try {
      const result = await db.select().from(tasks).where(eq(tasks.id, taskId));
      return result[0]; // as result is an array, we return the element here
    } catch (error) {
      console.error("Error fetching a specific task: ", error);
      throw new Error(`Failed to fetch task with ID ${taskId}`);
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
      console.error("Error creating new task: ", error);
      throw new Error(`Failed to create new task`);
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
      console.error("Error updating an existing task: ", error);
      throw new Error(`Failed to update task ${taskId}`);
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
      if (error instanceof Error) {
        console.error("Error deleting an existing task: ", error); // Safely access message
        throw new Error(error.message);
      } else {
        console.error("Error deleting an existing task: ", error); // Handle unexpected cases
        throw new Error("Failed to delete task due to an unknown error");
      }
    }
  },
};
