import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { dbConfig } from "../../drizzle.config";

const pool = new Pool(dbConfig); // set configuration for db

export const db = drizzle(pool); // for use in seeds
