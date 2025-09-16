/*
  Warnings:

  - Added the required column `tenant_id` to the `associate_address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "associate_address" ADD COLUMN     "tenant_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "associate_address" ADD CONSTRAINT "associate_address_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
