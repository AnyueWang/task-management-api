import { db } from "../db/index";
import { eq } from "drizzle-orm";
import { users } from "../db/schemas/users";
import { handleModelError } from "../utils/errorHandlers";

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
      handleModelError("Error in model: User registration", error);
    }
  },

  // find user by email which should be unique
  async findByEmail(email: string) {
    try {
      const result = await db
        .select()
        .from(users)
        .where(eq(users.email, email));

      if (result.length === 0) {
        throw new Error("Error finding user email!");
      }

      return result[0];
    } catch (error) {
      handleModelError("Error in model: Find user by email", error);
    }
  },

  // find user by id
  async findById(id: number) {
    try {
      const result = await db.select().from(users).where(eq(users.id, id));

      if (result.length === 0) {
        throw new Error(`User ${id} does not exist!`);
      }

      return result[0];
    } catch (error) {
      handleModelError(`Error in model: Find user by ID ${id}`, error);
    }
  },
};
