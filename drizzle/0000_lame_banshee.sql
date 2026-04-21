CREATE TYPE "public"."fame_rank" AS ENUM('ROOKIE', 'PRO', 'ALL_STAR', 'LEGEND', 'HALL_OF_FAME');--> statement-breakpoint
CREATE TYPE "public"."order_status" AS ENUM('PENDING', 'DEPOSIT_PAID', 'FULLY_PAID', 'CANCELLED');--> statement-breakpoint
CREATE TYPE "public"."order_type" AS ENUM('NORMAL', 'PRE_ORDER');--> statement-breakpoint
CREATE TYPE "public"."referral_status" AS ENUM('PENDING', 'SUCCESSFUL');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('USER', 'GHF_MEMBER', 'ADMIN');--> statement-breakpoint
CREATE TABLE "activity_logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"action" varchar(100) NOT NULL,
	"points_awarded" integer DEFAULT 0 NOT NULL,
	"timestamp" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "badges" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"icon" varchar(50) NOT NULL,
	"category" varchar(50) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "banners" (
	"id" serial PRIMARY KEY NOT NULL,
	"type" varchar(50) NOT NULL,
	"media_url" text NOT NULL,
	"title" varchar(255) NOT NULL,
	"subtitle" varchar(255),
	"cta_text" varchar(100),
	"cta_link" varchar(255),
	"layout" varchar(50) DEFAULT 'center',
	"sort_order" integer DEFAULT 0,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "blog_posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"content" text NOT NULL,
	"author_id" uuid,
	"featured_image" text,
	"is_published" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "blog_posts_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "ghf_membership" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"rank" integer,
	"badge_unlocking_status" boolean DEFAULT false,
	"lifetime_discount_code" varchar(50),
	"joined_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "ghf_membership_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "homepage_assets" (
	"id" serial PRIMARY KEY NOT NULL,
	"type" varchar(50) NOT NULL,
	"key" varchar(255) NOT NULL,
	"value" text NOT NULL,
	"is_active" boolean DEFAULT true,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "homepage_assets_key_unique" UNIQUE("key")
);
--> statement-breakpoint
CREATE TABLE "order_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"order_id" integer NOT NULL,
	"product_id" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"quantity" integer NOT NULL,
	"size" varchar(50) NOT NULL,
	"category" varchar(50) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" uuid,
	"status" "order_status" DEFAULT 'PENDING' NOT NULL,
	"type" "order_type" DEFAULT 'NORMAL' NOT NULL,
	"total_amount" numeric(10, 2) NOT NULL,
	"stripe_session_id" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "product_authenticity" (
	"id" serial PRIMARY KEY NOT NULL,
	"product_id" varchar(255),
	"serial_number" varchar(255) NOT NULL,
	"qr_hash" text NOT NULL,
	"owner_id" uuid,
	"is_authentic" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "product_authenticity_serial_number_unique" UNIQUE("serial_number")
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"price" numeric(10, 2) NOT NULL,
	"image" text,
	"category" varchar(100),
	"tags" text,
	"neural_signature" varchar(255),
	"ai_insights" text,
	"stock" integer DEFAULT 0 NOT NULL,
	"is_pre_order_only" boolean DEFAULT false,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "referrals" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"referrer_id" uuid NOT NULL,
	"referee_id" uuid NOT NULL,
	"status" "referral_status" DEFAULT 'PENDING' NOT NULL,
	"points_awarded" integer DEFAULT 0 NOT NULL,
	"nudge_count" integer DEFAULT 0 NOT NULL,
	"last_nudged_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "referrals_referee_id_unique" UNIQUE("referee_id")
);
--> statement-breakpoint
CREATE TABLE "site_settings" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" varchar(255) NOT NULL,
	"value" text NOT NULL,
	"category" varchar(100),
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "site_settings_key_unique" UNIQUE("key")
);
--> statement-breakpoint
CREATE TABLE "user_badges" (
	"user_id" uuid NOT NULL,
	"badge_id" varchar(255) NOT NULL,
	"unlocked_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255),
	"email" varchar(255) NOT NULL,
	"password" text,
	"email_verified" timestamp,
	"image" text,
	"role" "user_role" DEFAULT 'USER' NOT NULL,
	"address" text,
	"city" varchar(100),
	"country" varchar(100),
	"postal_code" varchar(20),
	"phone" varchar(20),
	"is_fn_member" boolean DEFAULT false,
	"fame_points" integer DEFAULT 0 NOT NULL,
	"fame_rank" "fame_rank" DEFAULT 'ROOKIE' NOT NULL,
	"fame_code" varchar(50),
	"is_squad_leader" boolean DEFAULT false,
	"current_streak" integer DEFAULT 0 NOT NULL,
	"max_streak" integer DEFAULT 0 NOT NULL,
	"last_active" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_fame_code_unique" UNIQUE("fame_code")
);
--> statement-breakpoint
ALTER TABLE "activity_logs" ADD CONSTRAINT "activity_logs_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "blog_posts" ADD CONSTRAINT "blog_posts_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ghf_membership" ADD CONSTRAINT "ghf_membership_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_authenticity" ADD CONSTRAINT "product_authenticity_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_authenticity" ADD CONSTRAINT "product_authenticity_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "referrals" ADD CONSTRAINT "referrals_referrer_id_users_id_fk" FOREIGN KEY ("referrer_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "referrals" ADD CONSTRAINT "referrals_referee_id_users_id_fk" FOREIGN KEY ("referee_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_badges" ADD CONSTRAINT "user_badges_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_badges" ADD CONSTRAINT "user_badges_badge_id_badges_id_fk" FOREIGN KEY ("badge_id") REFERENCES "public"."badges"("id") ON DELETE no action ON UPDATE no action;