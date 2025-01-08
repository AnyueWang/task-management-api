import { taskModel } from "../../models/taskModel";

export const taskResolvers = {
  Query: {
    getAllTasks: async () => {
      return await taskModel.getAllTasks();
    },
  },
};
