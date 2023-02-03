/*
  Warnings:

  - You are about to drop the column `commentMessage` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `postImage` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `postMessage` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `userAvatar` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `userEmail` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `userFirstName` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `userLastName` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `userPassword` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `descrition` to the `comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `avatar` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "users_userEmail_key";

-- AlterTable
ALTER TABLE "comments" DROP COLUMN "commentMessage",
ADD COLUMN     "descrition" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "posts" DROP COLUMN "postImage",
DROP COLUMN "postMessage",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "userAvatar",
DROP COLUMN "userEmail",
DROP COLUMN "userFirstName",
DROP COLUMN "userLastName",
DROP COLUMN "userPassword",
ADD COLUMN     "avatar" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
