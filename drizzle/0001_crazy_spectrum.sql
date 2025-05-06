ALTER TABLE "users" ALTER COLUMN "id" SET DATA TYPE bigint;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "id" SET DEFAULT generated always as identity;