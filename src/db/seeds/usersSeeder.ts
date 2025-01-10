import { seed } from "drizzle-seed";
import { db } from "../index";
import { users } from "../schemas/users";

export async function seedUsers() {
  try {
    const userSeed = await seed(db, { users }, { count: 10 }).refine(
      (funcs) => ({
        users: {
          columns: {
            name: funcs.fullName(),
            email: funcs.email(),
          },
        },
      })
    );
    console.log("Users seeded successfully");
    return await db.select().from(users);
  } catch (error) {
    console.error("Error seeding tasks: ", error);
    throw error;
  }
}
