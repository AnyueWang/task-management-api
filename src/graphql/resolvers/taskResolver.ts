import { taskModel } from "../../models/taskModel";
import { TaskStatusEnum } from "../../db/schemas/tasks";
import { LoggedUserType } from "../contexts/authContext";
import { AuthenticationError } from "apollo-server-express";

export const taskResolvers = {
  Query: {
    // fetch all the tasks
    getAllTasks: async (_: any, __: any, { user }: LoggedUserType) => {
      if (!user) {
        throw new AuthenticationError(
          "You must be logged in to view all tasks"
        );
      }

      return await taskModel.getAllTasks();
    },

    // fetch a task with a specific ID
    getTask: async (
      _: any,
      { taskId }: { taskId: number },
      { user }: LoggedUserType
    ) => {
      if (!user) {
        throw new AuthenticationError(
          "You must be logged in to view this task"
        );
      }

      return await taskModel.getTask(taskId);
    },
  },
  Mutation: {
    // create a new task
    createTask: async (
      _: any,
      {
        title,
        description,
        status,
      }: { title: string; description: string; status: TaskStatusEnum },
      { user }: LoggedUserType
    ) => {
      if (!user) {
        throw new AuthenticationError(
          "You must be logged in to create new task"
        );
      }

      return await taskModel.createTask(title, description, status);
    },

    // update an existing task
    updateTask: async (
      _: any,
      {
        taskId,
        title,
        description,
        status,
      }: {
        taskId: number;
        title?: string;
        description?: string;
        status: TaskStatusEnum;
      },
      { user }: LoggedUserType
    ) => {
      if (!user) {
        throw new AuthenticationError(
          "You must be logged in to update this task"
        );
      }

      return await taskModel.updateTask(taskId, title, description, status);
    },

    // delete an existing task
    deleteTask: async (
      _: any,
      { taskId }: { taskId: number },
      { user }: LoggedUserType
    ) => {
      if (!user) {
        throw new AuthenticationError(
          "You must be logged in to delete this task"
        );
      }

      return await taskModel.deleteTask(taskId);
    },
  },
};
