/*
  Warnings:

  - You are about to drop the column `quizId` on the `Response` table. All the data in the column will be lost.
  - Added the required column `classCode` to the `Response` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Response" DROP CONSTRAINT "Response_quizId_fkey";

-- AlterTable
ALTER TABLE "Response" DROP COLUMN "quizId",
ADD COLUMN     "classCode" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_classCode_fkey" FOREIGN KEY ("classCode") REFERENCES "Class"("classCode") ON DELETE RESTRICT ON UPDATE CASCADE;
