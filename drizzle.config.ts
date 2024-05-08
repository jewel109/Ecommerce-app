import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema/customerSchema.ts",
  out: "./drizzle",
} satisfies Config;
