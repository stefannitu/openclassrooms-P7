-- CreateTable
CREATE TABLE "reads" (
    "ownerId" TEXT NOT NULL,
    "postId" INTEGER NOT NULL,

    CONSTRAINT "reads_pkey" PRIMARY KEY ("postId","ownerId")
);

-- AddForeignKey
ALTER TABLE "reads" ADD CONSTRAINT "reads_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reads" ADD CONSTRAINT "reads_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
