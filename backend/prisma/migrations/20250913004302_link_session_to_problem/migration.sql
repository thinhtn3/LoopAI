-- DropForeignKey
ALTER TABLE "public"."Session" DROP CONSTRAINT "Session_problemSlug_fkey";

-- AddForeignKey
ALTER TABLE "public"."Session" ADD CONSTRAINT "Session_problemSlug_fkey" FOREIGN KEY ("problemSlug") REFERENCES "public"."Problem"("slug") ON DELETE SET NULL ON UPDATE CASCADE;
