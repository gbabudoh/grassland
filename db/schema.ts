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
  password: text("password"), // Hashed password
  emailVerified: timestamp("email_verified", { mode: "date" }),
  image: text("image"),
  role: userRoleEnum("role").default("USER").notNull(),
  address: text("address"),
  city: varchar("city", { length: 100 }),
  country: varchar("country", { length: 100 }),
  postalCode: varchar("postal_code", { length: 20 }),
  phone: varchar("phone", { length: 20 }),
  // Fame Network (FN) Extension
  isFnMember: boolean("is_fn_member").default(false),
  fnRank: integer("fn_rank"),
  fnNetworkTier: varchar("fn_tier", { length: 50 }).default("PIONEER"), // PIONEER, ELITE, AMBASSADOR
  fnAccessKey: varchar("fn_access_key", { length: 50 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const products = pgTable("products", {
  id: varchar("id", { length: 255 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  image: text("image"),
  category: varchar("category", { length: 100 }), // e.g., 'Velocity', 'Terrain', 'Hybrid'
  tags: text("tags"), // Comma separated or JSON string
  neuralSignature: varchar("neural_signature", { length: 255 }), // e.g., 'NRL-ALPHA-9'
  aiInsights: text("ai_insights"), // Premium AI-generated snippet
  stock: integer("stock").default(0).notNull(),
  isPreOrderOnly: boolean("is_pre_order_only").default(false),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const productAuthenticity = pgTable("product_authenticity", {
  id: serial("id").primaryKey(),
  productId: varchar("product_id", { length: 255 }).references(() => products.id),
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

export const banners = pgTable("banners", {
  id: serial("id").primaryKey(),
  type: varchar("type", { length: 50 }).notNull(), // 'video' | 'image'
  mediaUrl: text("media_url").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  subtitle: varchar("subtitle", { length: 255 }),
  ctaText: varchar("cta_text", { length: 100 }),
  ctaLink: varchar("cta_link", { length: 255 }),
  layout: varchar("layout", { length: 50 }).default("center"),
  sortOrder: integer("sort_order").default(0),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const siteSettings = pgTable("site_settings", {
  id: serial("id").primaryKey(),
  key: varchar("key", { length: 255 }).notNull().unique(),
  value: text("value").notNull(),
  category: varchar("category", { length: 100 }), // 'general', 'branding', 'seo'
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

// Replaced by ordersRelationsWithItems below

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

export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").references(() => orders.id).notNull(),
  productId: varchar("product_id", { length: 255 }).notNull(), // Can be string ID for now
  name: varchar("name", { length: 255 }).notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  quantity: integer("quantity").notNull(),
  size: varchar("size", { length: 50 }).notNull(),
  category: varchar("category", { length: 50 }).notNull(),
});

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
}));

export const ordersRelationsWithItems = relations(orders, ({ many, one }) => ({
  user: one(users, {
    fields: [orders.userId],
    references: [users.id],
  }),
  items: many(orderItems),
}));
