import { Pool } from "pg";
import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";

dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5433"),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
export const db = drizzle(pool);

export const connect = async () => {
  try {
    await pool.connect();
    console.log("Connected to the database.");
  } catch (error) {
    console.log("Failed to connect to the database: ", error);
    process.exit(1); // exit the process if connection fails
  }
};
