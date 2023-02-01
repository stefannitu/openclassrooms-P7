/*
  Warnings:

  - You are about to drop the column `postTitle` on the `message` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "message_postTitle_key";

-- AlterTable
ALTER TABLE "message" DROP COLUMN "postTitle";
