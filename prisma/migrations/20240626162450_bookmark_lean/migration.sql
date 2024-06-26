/*
  Warnings:

  - You are about to drop the column `page` on the `Bookmark` table. All the data in the column will be lost.
  - Changed the type of `bookmarkedItemId` on the `Bookmark` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Bookmark" DROP COLUMN "page",
DROP COLUMN "bookmarkedItemId",
ADD COLUMN     "bookmarkedItemId" INTEGER NOT NULL;
