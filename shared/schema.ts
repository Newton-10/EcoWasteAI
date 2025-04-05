import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const deviceAnalysis = pgTable("device_analysis", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  deviceType: text("device_type").notNull(),
  deviceCategory: text("device_category").notNull(),
  condition: text("condition").notNull(),
  confidence: integer("confidence").notNull(),
  components: text("components"),
  recyclable: text("recyclable"),
  remainingLifespan: text("remaining_lifespan"),
  lifespanAnalysis: text("lifespan_analysis"),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertDeviceAnalysisSchema = createInsertSchema(deviceAnalysis).omit({
  id: true,
  createdAt: true,
});

export type InsertDeviceAnalysis = z.infer<typeof insertDeviceAnalysisSchema>;
export type DeviceAnalysis = typeof deviceAnalysis.$inferSelect;
