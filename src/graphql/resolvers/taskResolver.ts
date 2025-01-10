import { taskModel } from "../../models/taskModel";
import { TaskStatusEnum } from "../../db/schemas/tasks";
import { LoggedUserType } from "../contexts/authContext";
import { AuthenticationError } from "apollo-server-express";
import { userModel } from "../../models/userModel";

export const taskResolvers = {
  Query: {
    // fetch all the tasks
    getAllTasks: async (_: any, __: any, { user }: LoggedUserType) => {
      if (!user) {
        throw new AuthenticationError(
          "You must be logged in to view all tasks"
        );
      }

      const tasks = await taskModel.getAllTasks();

      // populate created_by
      const tasksWithCreator = await Promise.all(
        tasks.map(async (task) => {
          const creator = await userModel.findById(task.created_by);
          return { ...task, created_by: creator };
        })
      );

      return tasksWithCreator;
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

      const task = await taskModel.getTask(taskId);
      const creator = await userModel.findById(task.created_by);
      return { ...task, created_by: creator };
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

      const task = await taskModel.createTask(
        title,
        description,
        status,
        user.id
      );
      const creator = await userModel.findById(task.created_by);
      return { ...task, created_by: creator };
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

      const task = await taskModel.getTask(taskId);

      if (task.created_by !== user.id) {
            throw new AuthenticationError(
              "You are not authorized to update this task"
            );
      }

      const updatedTask = await taskModel.updateTask(
        taskId,
        title,
        description,
        status
      );
      const creator = await userModel.findById(updatedTask.created_by);
      return { ...task, created_by: creator };
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

      const task = await taskModel.getTask(taskId);

      if (task.created_by !== user.id) {
        throw new AuthenticationError(
          "You are not authorized to delete this task"
        );
      }

      const deletedTask = await taskModel.deleteTask(taskId);
      const creator = await userModel.findById(deletedTask.created_by);
      return { ...task, created_by: creator };
    },
  },
};
