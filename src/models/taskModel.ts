import { db } from "../db/index";
import { tasks } from "../db/schemas/tasks";

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
};
