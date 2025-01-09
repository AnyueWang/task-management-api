import { db } from "../db/index";
import { users } from "../db/schemas/users";

export const userModel = {
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
      return result[0];
    } catch (error) {
      console.error("Error registration: ", error);
      throw new Error("Failed to create user");
    }
  },
};
