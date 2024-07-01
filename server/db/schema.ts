import {
  boolean,
  date,
  decimal,
  integer,
  numeric,
  pgTable,
  serial,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    userId: varchar("user_id", { length: 256 }).unique().notNull(),
    stripeCustomerId: varchar("stripe_customer_id", { length: 256 }).unique(),
    stripeSubscriptionId: varchar("stripe_subscription_id", {
      length: 256,
    }).unique(),
    stripeSessionId: varchar("stripe_session_id", { length: 256 }).unique(),
    name: varchar("name", { length: 256 }).notNull(),
    imageId: varchar("image_id", { length: 256 }).unique(),
    image: varchar("image", { length: 256 }),
    token: varchar("token", { length: 256 }),
    email: varchar("email", { length: 256 }).unique().notNull(),
    premium: boolean("premium").notNull(),
    isAdmin: boolean("is_admin").notNull(),
    notificationsOnAppVerification: boolean(
      "notifications_on_app_verification"
    ).notNull(),
    notificationsOnAppRating: boolean("notifications_on_app_rating").notNull(),
    notificationsByEmailVerification: boolean(
      "notifications_by_email_verification"
    ).notNull(),
    notificationsByEmailRating: boolean(
      "notifications_by_email_rating"
    ).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (users) => {
    return {
      idIndex: uniqueIndex("name_idx").on(users.id),
    };
  }
);

export const decorations = pgTable("decorations", {
  id: serial("id").primaryKey(),
  decorationId: varchar("decoration_id", { length: 256 }).unique(),
  name: varchar("name", { length: 256 }).notNull(),
  address: varchar("address", { length: 256 }).notNull(),
  verified: boolean("verified").notNull(),
  verificationSubmitted: boolean("verification_submitted").notNull(),
  rating: numeric("rating", { precision: 2, scale: 1 }).default("0"),
  numRatings: integer("num_ratings").default(0),
  latitude: numeric("latitude", { precision: 10, scale: 6 }).notNull(),
  longitude: numeric("longitude", { precision: 10, scale: 6 }).notNull(),
  country: varchar("country", { length: 256 }).notNull(),
  city: varchar("city", { length: 256 }).notNull(),
  year: varchar("year", { length: 256 }).notNull(),
  numViews: integer("num_views"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
  creatorId: integer("creator_id").references(() => users.id),
});

export const decorationImages = pgTable("decoration_images", {
  id: serial("id").primaryKey(),
  url: varchar("url", { length: 256 }).notNull(),
  decorationId: integer("decoration_id").references(() => decorations.id),
});

export const ratings = pgTable("ratings", {
  id: serial("id").primaryKey(),
  rating: integer("rating").notNull(),
  userId: integer("user_id").references(() => users.id),
  decorationId: integer("decoration_id").references(() => decorations.id),
});

export const views = pgTable("views", {
  id: serial("id").primaryKey(),
  createdAt: date("created_at", { mode: "string" }),
  userId: integer("user_id").references(() => users.id),
  decorationId: integer("decoration_id").references(() => decorations.id),
});

export const notifications = pgTable("notifications", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 256 }).notNull(),
  body: varchar("body", { length: 256 }).notNull(),
  unread: boolean("unread").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  userId: integer("user_id").references(() => users.id),
});

export const reports = pgTable("reports", {
  id: serial("id").primaryKey(),
  reasons: varchar("reasons", { length: 256 }).array().notNull(),
  additionalInfo: varchar("additional_info", { length: 256 }),
  unresolved: boolean("unresolved").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  userId: integer("user_id").references(() => users.id),
  decorationId: integer("decoration_id").references(() => decorations.id),
});

export const verifications = pgTable("verifications", {
  id: serial("id").primaryKey(),
  document: varchar("document", { length: 256 }).notNull(),
  new: boolean("new").notNull(),
  approved: boolean("approved").notNull(),
  rejected: boolean("rejected").notNull(),
  rejectedReason: varchar("rejected_reason", { length: 256 }),
  archived: boolean("archived").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  decorationId: integer("decooration_id").references(() => decorations.id),
});

export const routes = pgTable("routes", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
  userId: integer("creator_id").references(() => users.id),
});

export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);
export const insertDecorationSchema = createInsertSchema(decorations);
export const selectDecorationSchema = createSelectSchema(decorations);
export const insertDecorationImageSchema = createInsertSchema(decorationImages);
export const selectDecorationImageSchema = createSelectSchema(decorationImages);
export const insertRatingSchema = createInsertSchema(ratings);
export const selectRatingSchema = createSelectSchema(ratings);
export const insertViewSchema = createInsertSchema(views);
export const selectViewSchema = createSelectSchema(views);
export const insertNotificationSchema = createInsertSchema(notifications);
export const selectNotificationSchema = createSelectSchema(notifications);
export const insertReportSchema = createInsertSchema(reports);
export const selectReportSchema = createSelectSchema(reports);
export const insertVerificationSchema = createInsertSchema(verifications);
export const selectVerificationSchema = createSelectSchema(verifications);
