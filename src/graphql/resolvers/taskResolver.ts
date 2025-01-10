import { taskModel } from "../../models/taskModel";
import { TaskStatusEnum } from "../../db/schemas/tasks";
import { LoggedUserType } from "../contexts/authContext";
import { AuthenticationError } from "apollo-server-express";
import { userModel } from "../../models/userModel";
import { handleResolverError } from "../../utils/errorHandlers";

export const taskResolvers = {
  Query: {
    // fetch all the tasks
    getAllTasks: async (_: any, __: any, { user }: LoggedUserType) => {
      try {
        if (!user) {
          throw new AuthenticationError(
            "You must be logged in to view all tasks"
          );
        }

        const tasks = await taskModel.getAllTasks();

        if (!tasks) {
          throw new Error("Error fetching tasks");
        }

        // populate created_by
        const tasksWithCreator = await Promise.all(
          tasks.map(async (task) => {
            const creator = await userModel.findById(task.created_by);
            return { ...task, created_by: creator };
          })
        );

        return tasksWithCreator;
      } catch (error) {
        handleResolverError("Error in resolver: Fetch all tasks", error);
      }
    },

    // fetch a task with a specific ID
    getTask: async (
      _: any,
      { taskId }: { taskId: number },
      { user }: LoggedUserType
    ) => {
      try {
        if (!user) {
          throw new AuthenticationError(
            "You must be logged in to view this task"
          );
        }

        const task = await taskModel.getTask(taskId);

        if (!task) {
          throw new Error("Error fetching task");
        }

        const creator = await userModel.findById(task.created_by);
        return { ...task, created_by: creator };
      } catch (error) {
        handleResolverError(`Error in resolver: Fetch task ${taskId}`, error);
      }
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
      try {
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

        if (!task) {
          throw new Error("Error creating task");
        }

        const creator = await userModel.findById(task.created_by);
        return { ...task, created_by: creator };
      } catch (error) {
        handleResolverError("Error in resolver: Create new task", error);
      }
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
      try {
        if (!user) {
          throw new AuthenticationError(
            "You must be logged in to update this task"
          );
        }

        const task = await taskModel.getTask(taskId);

        if (!task) {
          throw new Error("Error fetching task");
        }

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

        if (!updatedTask) {
          throw new Error("Error updating task");
        }

        const creator = await userModel.findById(updatedTask.created_by);
        return { ...updatedTask, created_by: creator };
      } catch (error) {
        handleResolverError(`Error in resolver: update task ${taskId}`, error);
      }
    },

    // delete an existing task
    deleteTask: async (
      _: any,
      { taskId }: { taskId: number },
      { user }: LoggedUserType
    ) => {
      try {
        if (!user) {
          throw new AuthenticationError(
            "You must be logged in to delete this task"
          );
        }

        const task = await taskModel.getTask(taskId);

        if (!task) {
          throw new Error("Error fetching task");
        }

        if (task.created_by !== user.id) {
          throw new AuthenticationError(
            "You are not authorized to delete this task"
          );
        }

        await taskModel.deleteTask(taskId);
        return {
          message: `Task with ID ${taskId} has been successfully deleted.`,
        };
      } catch (error) {
        handleResolverError(`Error in resolver: delete task ${taskId}`, error);
      }
    },
  },
};
