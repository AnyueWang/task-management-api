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
  async createTask(title: string, description: string, status: TaskStatusEnum) {
    try {
      const result = await db
        .insert(tasks)
        .values({
          title: title,
          description: description,
          status: status,
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
      console.error("Error creating new task: ", error);
      throw new Error(`Failed to create new task`);
    }
  },
};
