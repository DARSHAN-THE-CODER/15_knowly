-- AlterTable
ALTER TABLE "Response" ADD COLUMN     "correct" INTEGER,
ALTER COLUMN "score" DROP NOT NULL;
