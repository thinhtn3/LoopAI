/*
  Warnings:

  - A unique constraint covering the columns `[sessionId]` on the table `ArchivedConversation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `problemSlug` to the `ArchivedConversation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."ArchivedConversation" ADD COLUMN     "problemSlug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ArchivedConversation_sessionId_key" ON "public"."ArchivedConversation"("sessionId");
