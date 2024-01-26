/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Bookmark` table. All the data in the column will be lost.
  - You are about to drop the column `postId` on the `Bookmark` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,referenceId,referenceType]` on the table `Bookmark` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `referenceId` to the `Bookmark` table without a default value. This is not possible if the table is not empty.
  - Added the required column `referenceType` to the `Bookmark` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Bookmark" DROP CONSTRAINT "Bookmark_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Bookmark" DROP CONSTRAINT "Bookmark_postId_fkey";

-- DropIndex
DROP INDEX "Bookmark_userId_categoryId_key";

-- AlterTable
ALTER TABLE "Bookmark" DROP COLUMN "categoryId",
DROP COLUMN "postId",
ADD COLUMN     "referenceId" TEXT NOT NULL,
ADD COLUMN     "referenceType" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Bookmark_userId_referenceId_referenceType_key" ON "Bookmark"("userId", "referenceId", "referenceType");
