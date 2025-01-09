import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config();

export const dbConfig_test = {
  user: process.env.DB_USER ?? "",
  host: process.env.DB_HOST ?? "",
  database: process.env.DB_NAME_TEST ?? "",
  password: process.env.DB_PASSWORD ?? "",
  port: parseInt(process.env.DB_PORT || "5433", 10),
  ssl: false,
};

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schemas",
  out: "./src/db/migrations",
  dbCredentials: dbConfig_test,
  migrations: {
    prefix: "timestamp",
    table: "__drizzle_migrations__",
    schema: "public",
  },
});
