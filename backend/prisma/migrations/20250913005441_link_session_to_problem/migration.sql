/*
  Warnings:

  - A unique constraint covering the columns `[userId,problemSlug]` on the table `Session` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Session_userId_problemSlug_key" ON "public"."Session"("userId", "problemSlug");
