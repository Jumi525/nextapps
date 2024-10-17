import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as dotenv from "dotenv";
import * as schema from "../../../migration/schema";
import { migrate } from "drizzle-orm/postgres-js/migrator";

const DATABASE_URL = process.env.DATABASE_URL || "";
dotenv.config({ path: ".env" });

if (!DATABASE_URL) {
  console.log("Cannot find database url");
}

const client = postgres(DATABASE_URL, { max: 1 });
const db = drizzle(client, { schema });
const migratedb = async () => {
  try {
    console.log("Migrating client");
    await migrate(db, { migrationsFolder: "migration" });
    console.log("Succesfully migrated");
  } catch (err) {
    console.log("Error migrating client", err);
  }
};

// migratedb();
export default db;
