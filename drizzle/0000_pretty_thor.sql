CREATE SCHEMA "ecommerce_schema";
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ecommerce_schema"."customer" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"email" text,
	"password" text,
	"active" boolean,
	"registered_at" timestamp
);
