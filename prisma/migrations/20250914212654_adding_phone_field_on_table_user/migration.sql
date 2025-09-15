/*
  Warnings:

  - Added the required column `creator_user_id` to the `associate_address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `creator_user_id` to the `associates` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "associate_address" ADD COLUMN     "creator_user_id" TEXT NOT NULL,
ADD COLUMN     "updater_user_id" TEXT;

-- AlterTable
ALTER TABLE "associates" ADD COLUMN     "creator_user_id" TEXT NOT NULL,
ADD COLUMN     "updater_user_id" TEXT;

-- AlterTable
ALTER TABLE "tenants" ADD COLUMN     "identity_color" TEXT,
ADD COLUMN     "logo_image" TEXT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "phone" TEXT;

-- AddForeignKey
ALTER TABLE "associates" ADD CONSTRAINT "associates_creator_user_id_fkey" FOREIGN KEY ("creator_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "associates" ADD CONSTRAINT "associates_updater_user_id_fkey" FOREIGN KEY ("updater_user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "associate_address" ADD CONSTRAINT "associate_address_creator_user_id_fkey" FOREIGN KEY ("creator_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "associate_address" ADD CONSTRAINT "associate_address_updater_user_id_fkey" FOREIGN KEY ("updater_user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
