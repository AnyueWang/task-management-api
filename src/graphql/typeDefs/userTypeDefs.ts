import { gql } from "apollo-server-express";

export const userTypeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    created_at: String
    updated_at: String
  }

  type Mutation {
    register(
      name: String!
      email: String!
      password: String!
      password_confirmation: String!
    ): User!
  }
`;
