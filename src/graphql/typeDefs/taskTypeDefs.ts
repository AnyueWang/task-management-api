import { gql } from "apollo-server-express";

export const taskTypeDefs = gql`
  enum TaskStatus {
    pending
    completed
  }

  type Task {
    id: ID!
    title: String!
    description: String
    status: String
    created_at: String
    updated_at: String
  }

  type Query {
    getAllTasks: [Task!]!
    getTask(taskId: Int!): Task
  }

  type Mutation {
    createTask(title: String!, description: String, status: TaskStatus!): Task!
    updateTask(
      taskId: Int!
      title: String
      description: String
      status: TaskStatus
    ): Task!
    deleteTask(taskId: Int!): Task!
  }
`;
