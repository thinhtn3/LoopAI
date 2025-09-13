/*
  Warnings:

  - Added the required column `problemSlug` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Session" ADD COLUMN     "problemSlug" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Session" ADD CONSTRAINT "Session_problemSlug_fkey" FOREIGN KEY ("problemSlug") REFERENCES "public"."Problem"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;
