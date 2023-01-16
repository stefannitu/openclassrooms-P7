-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "postTitle" TEXT NOT NULL,
    "postMessage" TEXT NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Message_postTitle_key" ON "Message"("postTitle");
