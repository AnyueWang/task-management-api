import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ApolloServer } from "apollo-server-express";
import { taskTypeDefs } from "./graphql/typeDefs/taskTypeDefs";
import { taskResolvers } from "./graphql/resolvers/taskResolver";
import { userTypeDefs } from "./graphql/typeDefs/userTypeDefs";
import { userResolvers } from "./graphql/resolvers/userResolver";
import { context } from "./graphql/contexts/context";

export async function startServer() {
  dotenv.config();
  const PORT =
    process.env.NODE_ENV === "test"
      ? process.env.PORT_TEST || 4001
      : process.env.PORT || 4000;

  const app = express();

  // Middlewares
  app.use(cors());
  app.use(express.json());

  // Apollo server setting
  const apolloServer = new ApolloServer({
    typeDefs: [taskTypeDefs, userTypeDefs],
    resolvers: [taskResolvers, userResolvers],
    context: context,
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  // Run the server
  const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  return { app, server };
}
