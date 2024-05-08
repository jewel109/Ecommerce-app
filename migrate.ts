import { migrate } from "drizzle-orm/postgres-js/migrator";
import { connection, db, queryClient } from "./src/db/util";
import { drizzle } from "drizzle-orm/postgres-js";
import { consola } from "consola";
import path from 'path'


async function migrateData() {
  await migrate(drizzle(queryClient), { migrationsFolder: './drizzle/' })
  process.exit(0)
}

migrateData().catch((err) => {
  consola.log(err)
  process.exit(1)
})

