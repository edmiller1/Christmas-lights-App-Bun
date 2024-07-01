CREATE TABLE IF NOT EXISTS "decoration_images" (
	"id" serial PRIMARY KEY NOT NULL,
	"url" varchar(256),
	"decoration_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "decorations" (
	"id" serial PRIMARY KEY NOT NULL,
	"decoration_id" varchar(256),
	"name" varchar(256),
	"address" varchar(256),
	"verified" boolean,
	"verification_submitted" boolean,
	"rating" numeric(2, 1),
	"num_ratings" integer,
	"latitude" numeric(10, 6),
	"longitude" numeric(10, 6),
	"country" varchar(256),
	"city" varchar(256),
	"year" varchar(256),
	"num_views" integer,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	"creator_id" varchar,
	CONSTRAINT "decorations_decoration_id_unique" UNIQUE("decoration_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "notifications" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(256),
	"body" varchar(256),
	"unread" boolean,
	"created_at" timestamp DEFAULT now(),
	"user_id" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ratings" (
	"id" serial PRIMARY KEY NOT NULL,
	"rating" integer,
	"user_id" integer,
	"decoration_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "reports" (
	"id" serial PRIMARY KEY NOT NULL,
	"reasons" varchar(256)[] NOT NULL,
	"additional_info" varchar(256),
	"unresolved" boolean,
	"created_at" timestamp DEFAULT now(),
	"user_id" integer,
	"decoration_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "routes" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	"creator_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar(256),
	"stripe_customer_id" varchar(256),
	"stripe_subscription_id" varchar(256),
	"stripe_session_id" varchar(256),
	"name" varchar(256) NOT NULL,
	"image_id" varchar(256),
	"image" varchar(256),
	"token" varchar(256),
	"email" varchar(256) NOT NULL,
	"premium" boolean,
	"is_admin" boolean,
	"notifications_on_app_verification" boolean,
	"notifications_on_app_rating" boolean,
	"notifications_by_email_verification" boolean,
	"notifications_by_email_rating" boolean,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "users_user_id_unique" UNIQUE("user_id"),
	CONSTRAINT "users_stripe_customer_id_unique" UNIQUE("stripe_customer_id"),
	CONSTRAINT "users_stripe_subscription_id_unique" UNIQUE("stripe_subscription_id"),
	CONSTRAINT "users_stripe_session_id_unique" UNIQUE("stripe_session_id"),
	CONSTRAINT "users_image_id_unique" UNIQUE("image_id"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "verifications" (
	"id" serial PRIMARY KEY NOT NULL,
	"document" varchar(256),
	"new" boolean,
	"approved" boolean,
	"rejected" boolean,
	"rejected_reason" varchar(256),
	"archived" boolean,
	"created_at" timestamp DEFAULT now(),
	"decooration_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "views" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" date NOT NULL,
	"user_id" integer,
	"decoration_id" integer
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "decoration_images" ADD CONSTRAINT "decoration_images_decoration_id_decorations_id_fk" FOREIGN KEY ("decoration_id") REFERENCES "public"."decorations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "decorations" ADD CONSTRAINT "decorations_creator_id_users_id_fk" FOREIGN KEY ("creator_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ratings" ADD CONSTRAINT "ratings_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ratings" ADD CONSTRAINT "ratings_decoration_id_decorations_id_fk" FOREIGN KEY ("decoration_id") REFERENCES "public"."decorations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "reports" ADD CONSTRAINT "reports_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "reports" ADD CONSTRAINT "reports_decoration_id_decorations_id_fk" FOREIGN KEY ("decoration_id") REFERENCES "public"."decorations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "routes" ADD CONSTRAINT "routes_creator_id_users_id_fk" FOREIGN KEY ("creator_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "verifications" ADD CONSTRAINT "verifications_decooration_id_decorations_id_fk" FOREIGN KEY ("decooration_id") REFERENCES "public"."decorations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "views" ADD CONSTRAINT "views_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "views" ADD CONSTRAINT "views_decoration_id_decorations_id_fk" FOREIGN KEY ("decoration_id") REFERENCES "public"."decorations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "name_idx" ON "users" USING btree ("id");