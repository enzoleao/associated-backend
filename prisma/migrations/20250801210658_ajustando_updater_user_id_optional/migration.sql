/*
  Warnings:

  - Made the column `creator_user_id` on table `promotions` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "promotions" DROP CONSTRAINT "promotions_creator_user_id_fkey";

-- DropForeignKey
ALTER TABLE "promotions" DROP CONSTRAINT "promotions_updater_user_id_fkey";

-- AlterTable
ALTER TABLE "promotions" ALTER COLUMN "creator_user_id" SET NOT NULL,
ALTER COLUMN "updater_user_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "promotions" ADD CONSTRAINT "promotions_creator_user_id_fkey" FOREIGN KEY ("creator_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "promotions" ADD CONSTRAINT "promotions_updater_user_id_fkey" FOREIGN KEY ("updater_user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
