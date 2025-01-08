import { gql } from "apollo-server-express";

export const taskTypeDefs = gql`
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
  }
`;
