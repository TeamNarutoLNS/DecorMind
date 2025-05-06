CREATE TABLE "aiGeneratedImage" (
	"id" serial PRIMARY KEY NOT NULL,
	"roomType" varchar(255) NOT NULL,
	"designType" varchar(255) NOT NULL,
	"orgImage" varchar(500) NOT NULL,
	"aiImage" varchar(500) NOT NULL,
	"userEmail" varchar(255)
);
--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "id" SET DATA TYPE serial;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "imageUrl" DROP NOT NULL;