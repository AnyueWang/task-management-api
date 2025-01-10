import { seed } from "drizzle-seed";
import { db } from "../index";
import { tasks } from "../schemas/tasks";
import { seedUsers } from "./usersSeeder";

export async function seedTasks() {
  try {
    const users = await seedUsers();
    const userIds = users.map((user: any) => user.id);

    await seed(db, { tasks }, { count: 30 }).refine((funcs) => ({
      tasks: {
        columns: {
          title: funcs.jobTitle(),
          description: funcs.loremIpsum({
            sentencesCount: 3,
          }),
          created_by: funcs.valuesFromArray({ values: userIds }),
        },
      },
    }));
    console.log("Tasks seeded successfully");
  } catch (error) {
    console.error("Error seeding tasks: ", error);
  }
}
