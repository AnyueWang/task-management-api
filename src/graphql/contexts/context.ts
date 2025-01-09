import { authContext } from "./authContext";
import { AuthenticationError } from "apollo-server-express";
import { Request } from "express";

export const context = async ({ req }: { req: Request }) => {
  return authContext({ req });
};
