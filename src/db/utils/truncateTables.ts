import { db } from "../index";

export async function truncateTables() {
  await db.execute(`TRUNCATE TABLE "users" RESTART IDENTITY CASCADE;`);
  await db.execute(`TRUNCATE TABLE "tasks" RESTART IDENTITY CASCADE;`);
}
