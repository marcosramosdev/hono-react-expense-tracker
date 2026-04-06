import 'dotenv/config';
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
});

const db = drizzle(pool, {
  casing: "snake_case"
});

export default db;