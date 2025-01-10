import { db } from "../db/index";
import { eq } from "drizzle-orm";
import { users } from "../db/schemas/users";

export const userModel = {
  // user registration
  async register(name: string, email: string, hashedPassword: string) {
    try {
      const result = await db
        .insert(users)
        .values({
          name: name,
          email: email,
          password: hashedPassword,
        })
        .returning();
      console.log("Register successfully!");
      return result[0];
    } catch (error) {
      console.error("Error registration: ", error);
      throw new Error("Failed to create user");
    }
  },

  // find user by email which should be unique
  async findByEmail(email: string) {
    try {
      const result = await db
        .select()
        .from(users)
        .where(eq(users.email, email));

      // throw error for wrong email address but not explicitly telling users
      if (result.length === 0) {
        throw new Error("Error finding user email!");
      }

      return result[0];
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error finding user email: ", error);
        throw new Error(error.message);
      } else {
        console.error("Error finding user email: ", error);
        throw new Error("Credential wrong!");
      }
    }
  },

  // find user by email which should be unique
  async findById(id: number) {
    try {
      const result = await db
        .select()
        .from(users)
        .where(eq(users.id, id));

      // throw error for wrong email address but not explicitly telling users
      if (result.length === 0) {
        throw new Error(`User ${id} does not exist!`);
      }

      return result[0];
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error finding user id: ", error);
        throw new Error(error.message);
      } else {
        console.error("Error finding user id: ", error);
        throw new Error(`Failed to fetch user with id ${id}`);
      }
    }
  },
};
