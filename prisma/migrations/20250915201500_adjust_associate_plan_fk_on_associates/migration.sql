/*
  Warnings:

  - Added the required column `associate_plan_id` to the `associates` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "associates" ADD COLUMN     "associate_plan_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "associates" ADD CONSTRAINT "associates_associate_plan_id_fkey" FOREIGN KEY ("associate_plan_id") REFERENCES "associate_plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
