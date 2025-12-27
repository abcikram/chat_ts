import path from "path";
import { logger } from "../lib/logger";
import fs from "node:fs";
import { query } from "./db";

const migrationsDir = path.resolve(process.cwd(), "src", "migrations");

async function runMigrations() {
  logger.info(`Running migrations from directory: ${migrationsDir}`);

  const files = fs
    .readdirSync(migrationsDir)
    .filter((file) => file.endsWith(".sql"))
    .sort();

  if (files.length === 0) {
    logger.info("No migration files found.");
    return;
  }
  for (const file of files) {
    const fullPath = path.join(migrationsDir, file);
    const sql = fs.readFileSync(fullPath, "utf-8");

    logger.info(`Running migration: ${file}`);

    await query(sql);

    logger.info(`Finnished migration: ${file}`);
  }
}

runMigrations()
  .then(() => {
    logger.info("All migrations completed successfully.");
    process.exit(0);
  })
  .catch((error) => {
    logger.error("Error running migrations:", error);
    process.exit(1);
  });
