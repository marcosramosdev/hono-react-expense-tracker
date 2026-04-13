import "dotenv/config";
import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";
import { neon } from "@neondatabase/serverless";
import {
  drizzle as neonDrizzle,
  NeonHttpDatabase,
} from "drizzle-orm/neon-http";

// dev
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
});

let dbClient:
  | NodePgDatabase<typeof schema>
  | NeonHttpDatabase<Record<string, any>>
  | undefined;

const getDbConnection = () => {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }
  // dev
  if (!dbClient && process.env.APP_ENV === "development") {
    dbClient = drizzle(process.env.DATABASE_URL!, {
      schema,
      casing: "snake_case",
    });
  }

  if (!dbClient && process.env.APP_ENV === "production") {
    // prod
    const sql = neon(process.env.DATABASE_URL!);
    dbClient = neonDrizzle({ client: sql, schema, casing: "snake_case" });
  }

  return dbClient;
};

export const db = getDbConnection();
