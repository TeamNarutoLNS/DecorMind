CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"imageUrl" varchar(500) NOT NULL,
	"credits" integer DEFAULT 3
);
