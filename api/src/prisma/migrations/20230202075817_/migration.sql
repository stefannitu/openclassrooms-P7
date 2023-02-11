/*
  Warnings:

  - You are about to drop the `Likes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Likes" DROP CONSTRAINT "Likes_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Likes" DROP CONSTRAINT "Likes_postId_fkey";

-- DropTable
DROP TABLE "Likes";

-- CreateTable
CREATE TABLE "likes" (
    "id" SERIAL NOT NULL,
    "ownerId" TEXT NOT NULL,
    "postId" INTEGER NOT NULL,

    CONSTRAINT "likes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "likes_ownerId_key" ON "likes"("ownerId");

-- CreateIndex
CREATE UNIQUE INDEX "likes_postId_key" ON "likes"("postId");

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_postId_fkey" FOREIGN KEY ("postId") REFERENCES "message"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
