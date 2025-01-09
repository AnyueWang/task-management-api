import { seed } from "drizzle-seed";
import { db } from "../index";
import { tasks } from "../schemas/tasks";

export async function seedTasks() {
  try {
    await seed(db, { tasks }, { count: 10 }).refine((funcs) => ({
      tasks: {
        columns: {
          title: funcs.jobTitle(),
          description: funcs.loremIpsum({
            sentencesCount: 3,
          }),
        },
      },
    }));
    console.log("Tasks seeded successfully");
  } catch (error) {
    console.error("Error seeding tasks: ", error);
  }
}
