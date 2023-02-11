/*
  Warnings:

  - Added the required column `userAvatar` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userFirstName` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userLastName` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "userAvatar" TEXT NOT NULL,
ADD COLUMN     "userFirstName" TEXT NOT NULL,
ADD COLUMN     "userLastName" TEXT NOT NULL;
