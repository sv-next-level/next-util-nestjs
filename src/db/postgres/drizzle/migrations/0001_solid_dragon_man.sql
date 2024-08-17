ALTER TABLE "articles" RENAME COLUMN "title" TO "name";--> statement-breakpoint
ALTER TABLE "articles" DROP COLUMN IF EXISTS "content";