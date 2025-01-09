import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { dbConfig } from "../../drizzle.config";
import { dbConfig_test } from "../../drizzle-test.config";

const pool = new Pool(
  process.env.NODE_ENV === "test" ? dbConfig_test : dbConfig
); // set configuration for db

export const db = drizzle(pool); // for use in seeds
