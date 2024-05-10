ALTER TABLE "ecommerce_schema"."customer" ALTER COLUMN "registered_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "ecommerce_schema"."customer" ADD COLUMN "hashedPassword" text;--> statement-breakpoint
ALTER TABLE "ecommerce_schema"."customer" ADD CONSTRAINT "customer_name_unique" UNIQUE("name");--> statement-breakpoint
ALTER TABLE "ecommerce_schema"."customer" ADD CONSTRAINT "customer_email_unique" UNIQUE("email");