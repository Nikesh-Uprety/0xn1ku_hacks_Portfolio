import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table for authentication
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").unique(),
  role: text("role").notNull().default("user"), // user, admin
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

// Blog posts table
export const blogs = pgTable("blogs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  excerpt: text("excerpt").notNull(),
  author: text("author").notNull().default("0xN1kU_H4X_!"),
  tags: jsonb("tags").$type<string[]>().notNull().default([]),
  featured: boolean("featured").notNull().default(false),
  published: boolean("published").notNull().default(true),
  read_time: text("read_time").notNull().default("5 min read"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

// Hacks/Bookmarks table
export const hacks = pgTable("hacks", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  url: text("url").notNull(),
  description: text("description"),
  category: text("category").notNull(), // platforms, tools, resources, writeups
  favicon: text("favicon"),
  difficulty: text("difficulty"), // beginner, intermediate, advanced
  tags: jsonb("tags").$type<string[]>().notNull().default([]),
  featured: boolean("featured").notNull().default(false),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

// Secrets/Tools table  
export const secrets = pgTable("secrets", {
  id: serial("id").primaryKey(),
  key: text("key").notNull().unique(),
  value: text("value").notNull(),
  description: text("description"),
  category: text("category").notNull().default("general"), // general, api, database, encryption
  encrypted: boolean("encrypted").notNull().default(true),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

// Portfolio content table for index page
export const portfolio_content = pgTable("portfolio_content", {
  id: serial("id").primaryKey(),
  section: text("section").notNull().unique(), // hero, about, skills, projects, contact
  title: text("title"),
  content: jsonb("content").$type<Record<string, any>>().notNull(),
  published: boolean("published").notNull().default(true),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

// Projects table for portfolio projects
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  tech_stack: jsonb("tech_stack").$type<string[]>().notNull().default([]),
  github_url: text("github_url"),
  live_url: text("live_url"),
  image_url: text("image_url"),
  featured: boolean("featured").notNull().default(false),
  order_index: integer("order_index").notNull().default(0),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

// Schema validations
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  role: true,
});

export const insertBlogSchema = createInsertSchema(blogs).omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export const updateBlogSchema = createInsertSchema(blogs).omit({
  id: true,
  created_at: true,
}).partial();

export const insertHackSchema = createInsertSchema(hacks).omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export const updateHackSchema = createInsertSchema(hacks).omit({
  id: true,
  created_at: true,
}).partial();

export const insertSecretSchema = createInsertSchema(secrets).omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export const updateSecretSchema = createInsertSchema(secrets).omit({
  id: true,
  created_at: true,
}).partial();

export const insertPortfolioContentSchema = createInsertSchema(portfolio_content).omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export const updatePortfolioContentSchema = createInsertSchema(portfolio_content).omit({
  id: true,
  created_at: true,
}).partial();

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export const updateProjectSchema = createInsertSchema(projects).omit({
  id: true,
  created_at: true,
}).partial();

// Type exports
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertBlog = z.infer<typeof insertBlogSchema>;
export type UpdateBlog = z.infer<typeof updateBlogSchema>;
export type Blog = typeof blogs.$inferSelect;

export type InsertHack = z.infer<typeof insertHackSchema>;
export type UpdateHack = z.infer<typeof updateHackSchema>;
export type Hack = typeof hacks.$inferSelect;

export type InsertSecret = z.infer<typeof insertSecretSchema>;
export type UpdateSecret = z.infer<typeof updateSecretSchema>;
export type Secret = typeof secrets.$inferSelect;

export type InsertPortfolioContent = z.infer<typeof insertPortfolioContentSchema>;
export type UpdatePortfolioContent = z.infer<typeof updatePortfolioContentSchema>;
export type PortfolioContent = typeof portfolio_content.$inferSelect;

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type UpdateProject = z.infer<typeof updateProjectSchema>;
export type Project = typeof projects.$inferSelect;
