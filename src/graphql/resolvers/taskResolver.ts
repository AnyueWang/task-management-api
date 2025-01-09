import { taskModel } from "../../models/taskModel";

export const taskResolvers = {
  Query: {
    getAllTasks: async () => {
      return await taskModel.getAllTasks();
    },
    getTask: async (_: any, { taskId }: { taskId: number }) => {
      return await taskModel.getTask(taskId);
    },
  },
};
