import { taskModel } from "../../models/taskModel";
import { TaskStatusEnum } from "../../db/schemas/tasks";

export const taskResolvers = {
  Query: {
    getAllTasks: async () => {
      return await taskModel.getAllTasks();
    },
    getTask: async (_: any, { taskId }: { taskId: number }) => {
      return await taskModel.getTask(taskId);
    },
  },
  Mutation: {
    createTask: async (
      _: any,
      {
        title,
        description,
        status,
      }: { title: string; description: string; status: TaskStatusEnum }
    ) => {
      return await taskModel.createTask(title, description, status);
    },
  },
};
