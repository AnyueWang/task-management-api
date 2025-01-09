import { gql } from "apollo-server-express";

export const userTypeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    created_at: String
    updated_at: String
  }

  type AuthPayload {
    user: User!
    token: String!
  }

  type Mutation {
    register(
      name: String!
      email: String!
      password: String!
      password_confirmation: String!
    ): User!
    login(email: String!, password: String!): AuthPayload!
  }
`;
