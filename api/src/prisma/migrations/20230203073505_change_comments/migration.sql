/*
  Warnings:

  - You are about to drop the column `descrition` on the `comments` table. All the data in the column will be lost.
  - Added the required column `description` to the `comments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "comments" DROP COLUMN "descrition",
ADD COLUMN     "description" TEXT NOT NULL;
