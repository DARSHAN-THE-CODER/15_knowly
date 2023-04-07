/*
  Warnings:

  - A unique constraint covering the columns `[id,studentName]` on the table `Response` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Response_id_studentName_key" ON "Response"("id", "studentName");
