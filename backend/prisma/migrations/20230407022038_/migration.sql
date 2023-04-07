/*
  Warnings:

  - You are about to drop the column `classId` on the `Quiz` table. All the data in the column will be lost.
  - Added the required column `classCode` to the `Quiz` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Quiz" DROP CONSTRAINT "Quiz_classId_fkey";

-- AlterTable
ALTER TABLE "Quiz" DROP COLUMN "classId",
ADD COLUMN     "classCode" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_classCode_fkey" FOREIGN KEY ("classCode") REFERENCES "Class"("classCode") ON DELETE RESTRICT ON UPDATE CASCADE;
