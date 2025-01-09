import { AuthenticationError } from "apollo-server-express";
import jwt from "jsonwebtoken";
import { Request } from "express";

export interface ContextType {
  user: { id: string; email: string } | null;
}

// secret key for JWT token
const SECRET_KEY = process.env.JWT_SECRET_KEY;
if (!SECRET_KEY) {
  throw new Error(
    "JWT_SECRET_KEY is not defined in the environment variables."
  );
}

export const authContext = ({ req }: { req: Request }): ContextType => {
  const token = req.headers["authorization"]?.split(" ")[1]; // extract token from "Bearer xxxx"

  if (!token) {
    throw new AuthenticationError("Authorization token is required!");
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY); // verify token with secret key
    return { user: decoded as { id: string; email: string } }; // type casting for decoded
  } catch (error) {
    throw new AuthenticationError("Invalid or expired token!");
  }
};
