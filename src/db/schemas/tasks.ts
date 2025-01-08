import {
  pgTable,
  uuid,
  varchar,
  text,
  pgEnum,
  timestamp,
} from "drizzle-orm/pg-core";

const TaskStatusEnum = pgEnum("status", ["pending", "completed"]); // enum for different status

export const tasks = pgTable("tasks", {
  id: uuid("id").primaryKey().notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  status: TaskStatusEnum("status").notNull(), // notNull not supported for pgEnum().notNull() so we use this way
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});
