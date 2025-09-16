/*
  Warnings:

  - You are about to drop the column `payment_preference_id` on the `associates` table. All the data in the column will be lost.
  - Added the required column `payment_method_preference_id` to the `associates` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "associates" DROP COLUMN "payment_preference_id",
ADD COLUMN     "payment_method_preference_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "associates" ADD CONSTRAINT "associates_payment_method_preference_id_fkey" FOREIGN KEY ("payment_method_preference_id") REFERENCES "payment_methods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
