import { boolean, pgSchema, serial, text, varchar, timestamp } from "drizzle-orm/pg-core";


export const ecommerce_schema = pgSchema("ecommerce_schema")


export const customers_schema = ecommerce_schema.table("customer", {
  id: serial("id").primaryKey(),
  name: text("name").unique(),
  email: text("email").unique(),
  password: text("password"),
  hashedPassword: text("hashedPassword"),
  active: boolean("active"),
  registered_at: timestamp("registered_at").defaultNow()
})

