import {
  pgTable,
  serial,
  text,
  varchar,
  boolean,
  timestamp,
  integer,
  decimal,
  uuid,
  pgEnum,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Enums
export const userRoleEnum = pgEnum("user_role", ["USER", "GHF_MEMBER", "ADMIN"]);
export const orderStatusEnum = pgEnum("order_status", [
  "PENDING",
  "DEPOSIT_PAID",
  "FULLY_PAID",
  "CANCELLED",
]);
export const orderTypeEnum = pgEnum("order_type", ["NORMAL", "PRE_ORDER"]);

// Tables
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull().unique(),
  emailVerified: timestamp("email_verified", { mode: "date" }),
  image: text("image"),
  role: userRoleEnum("role").default("USER").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  stock: integer("stock").default(0).notNull(),
  isPreOrderOnly: boolean("is_pre_order_only").default(false),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const productAuthenticity = pgTable("product_authenticity", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").references(() => products.id),
  serialNumber: varchar("serial_number", { length: 255 }).unique().notNull(),
  qrHash: text("qr_hash").notNull(),
  ownerId: uuid("owner_id").references(() => users.id),
  isAuthentic: boolean("is_authentic").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  userId: uuid("userId").references(() => users.id),
  status: orderStatusEnum("status").default("PENDING").notNull(),
  type: orderTypeEnum("type").default("NORMAL").notNull(),
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
  stripeSessionId: varchar("stripe_session_id", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const ghfMembership = pgTable("ghf_membership", {
  id: serial("id").primaryKey(),
  userId: uuid("user_id").references(() => users.id).unique().notNull(),
  rank: integer("rank"), // e.g., position in the first 2,000
  badgeUnlockingStatus: boolean("badge_unlocking_status").default(false),
  lifetimeDiscountCode: varchar("lifetime_discount_code", { length: 50 }),
  joinedAt: timestamp("joined_at").defaultNow().notNull(),
});

export const homepageAssets = pgTable("homepage_assets", {
  id: serial("id").primaryKey(),
  type: varchar("type", { length: 50 }).notNull(), // e.g., 'BANNER_VIDEO', 'SLOGAN', 'TOGGLE'
  key: varchar("key", { length: 255 }).notNull().unique(), // e.g., 'hero_video_url'
  value: text("value").notNull(),
  isActive: boolean("is_active").default(true),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  content: text("content").notNull(),
  authorId: uuid("author_id").references(() => users.id),
  featuredImage: text("featured_image"),
  isPublished: boolean("is_published").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Relations
export const usersRelations = relations(users, ({ many, one }) => ({
  orders: many(orders),
  ghfMembership: one(ghfMembership, {
    fields: [users.id],
    references: [ghfMembership.userId],
  }),
  authenticityTokens: many(productAuthenticity),
}));

export const productsRelations = relations(products, ({ many }) => ({
  authenticityTokens: many(productAuthenticity),
}));

export const ordersRelations = relations(orders, ({ one }) => ({
  user: one(users, {
    fields: [orders.userId],
    references: [users.id],
  }),
}));

export const productAuthenticityRelations = relations(productAuthenticity, ({ one }) => ({
  product: one(products, {
    fields: [productAuthenticity.productId],
    references: [products.id],
  }),
  owner: one(users, {
    fields: [productAuthenticity.ownerId],
    references: [users.id],
  }),
}));

export const ghfMembershipRelations = relations(ghfMembership, ({ one }) => ({
  user: one(users, {
    fields: [ghfMembership.userId],
    references: [users.id],
  }),
}));
