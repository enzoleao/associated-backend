/*
  Warnings:

  - You are about to drop the `products_has_permissions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "products_has_permissions" DROP CONSTRAINT "products_has_permissions_product_id_fkey";

-- DropForeignKey
ALTER TABLE "products_has_permissions" DROP CONSTRAINT "products_has_permissions_promotion_id_fkey";

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "promotion_id" TEXT;

-- DropTable
DROP TABLE "products_has_permissions";

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_promotion_id_fkey" FOREIGN KEY ("promotion_id") REFERENCES "promotions"("id") ON DELETE SET NULL ON UPDATE CASCADE;
