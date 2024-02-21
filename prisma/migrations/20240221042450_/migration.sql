/*
  Warnings:

  - Added the required column `file` to the `Photo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Photo" ADD COLUMN     "caption" TEXT,
ADD COLUMN     "file" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Hashtags" (
    "id" SERIAL NOT NULL,
    "hashtag" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Hashtags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_HashtagsToPhoto" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_HashtagsToPhoto_AB_unique" ON "_HashtagsToPhoto"("A", "B");

-- CreateIndex
CREATE INDEX "_HashtagsToPhoto_B_index" ON "_HashtagsToPhoto"("B");

-- AddForeignKey
ALTER TABLE "_HashtagsToPhoto" ADD CONSTRAINT "_HashtagsToPhoto_A_fkey" FOREIGN KEY ("A") REFERENCES "Hashtags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HashtagsToPhoto" ADD CONSTRAINT "_HashtagsToPhoto_B_fkey" FOREIGN KEY ("B") REFERENCES "Photo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
