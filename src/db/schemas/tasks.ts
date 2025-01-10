import {
  pgTable,
  serial,
  varchar,
  text,
  pgEnum,
  timestamp,
  integer,
} from "drizzle-orm/pg-core";
import { users } from "./users";

export enum TaskStatusEnum { // export this to use defined status instead of hardcoding each status anywhere else
  Pending = "pending",
  Completed = "completed",
}

export const taskStatusEnum = pgEnum(
  "status",
  Object.values(TaskStatusEnum) as [string, ...string[]]
); // enum for different status

export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey().notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  status: taskStatusEnum().default(TaskStatusEnum.Pending), // pgEnum().notNull() is not supported so we use this way
  created_by: integer("created_by") // foreign key referencing to users id
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});
