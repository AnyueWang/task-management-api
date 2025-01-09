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
      console.log(db);
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
};
