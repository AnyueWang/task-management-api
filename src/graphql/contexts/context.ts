import { authContext } from "./authContext";
import { AuthenticationError } from "apollo-server-express";
import { Request } from "express";

export const context = async ({ req }: { req: Request }) => {
  const operationName = req.body.operationName;

  // Skip authentication for login and register
  if (operationName === "login" || operationName === "register") {
    return {}; // Empty context for these operations
  }

  // Apply authentication for other operations
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    throw new AuthenticationError("Authorization token is required!");
  }

  return authContext({ req }); // Delegate token validation to authContext
};
