-- AlterTable
ALTER TABLE "Class" ADD COLUMN     "story" TEXT;

-- CreateTable
CREATE TABLE "CronJob" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lastRun" TIMESTAMP(3),

    CONSTRAINT "CronJob_pkey" PRIMARY KEY ("id")
);
