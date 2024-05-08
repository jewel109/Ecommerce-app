
import { consola } from 'consola';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import dotenv from 'dotenv'
import path from "path"
import psql from "drizzle-orm/postgres-js"

consola.log(dotenv.config({ path: path.resolve(__dirname, "../../dev.env") }))

export const connection = process.env?.DB_URL || ""


consola.log(connection)

export const queryClient = postgres(connection, { max: 1 });
export const db = drizzle(queryClient, { logger: true });




