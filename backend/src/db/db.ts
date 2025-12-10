import { Pool, QueryResult, QueryResultRow } from "pg";
import env from "../config/env";
import { logger } from "../lib/logger";

export const pool = new Pool({
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
});

export async function query<T extends QueryResultRow = QueryResultRow>(
    text: string,
    params?: unknown[]
): Promise<QueryResult<T>> {
  const result = await pool.query<T>(text, params as any[]);
  return result
}

export async function assertDatabaseConnection() {
  try {
    await pool.query("SELECT 1");
    logger.info("Database connected successfully");
  } catch (error) {
    throw new Error(
      "Failed to connect to the database: " + (error as Error).message
    );
  }
}