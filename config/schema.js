import { pgTable, serial, varchar, integer } from "drizzle-orm/pg-core"; 

export const Users = pgTable("users", {
  id: serial("id").primaryKey(), // ✅ Auto-incrementing ID
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  imageUrl: varchar("imageUrl", { length: 500 }),
  credits: integer("credits").default(3),
});

export const AiGeneratedImage = pgTable("aiGeneratedImage", {
  id: serial("id").primaryKey(), // ✅ Auto-incrementing ID
  roomType: varchar("roomType").notNull(),
  designType: varchar("designType").notNull(),
  orgImage: varchar("orgImage").notNull(),
  aiImage: varchar("aiImage").notNull(),
  userEmail: varchar("userEmail"),
});
