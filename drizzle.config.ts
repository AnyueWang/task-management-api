import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schemas",
  out: "./src/db/migrations",
  dbCredentials: {
    user: process.env.DB_USER ?? "",
    host: process.env.DB_HOST ?? "",
    database: process.env.DB_NAME ?? "",
    password: process.env.DB_PASSWORD ?? "",
    port: parseInt(process.env.DB_PORT || "5433", 10),
    ssl: false,
  },
});
