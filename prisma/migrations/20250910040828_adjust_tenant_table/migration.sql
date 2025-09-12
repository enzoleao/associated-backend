/*
  Warnings:

  - You are about to drop the column `tenant_address_id` on the `tenants` table. All the data in the column will be lost.
  - You are about to drop the column `tenant_status_id` on the `tenants` table. All the data in the column will be lost.
  - You are about to drop the `tenant_address` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `name` on table `tenants` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "tenants" DROP CONSTRAINT "tenants_tenant_address_id_fkey";

-- AlterTable
ALTER TABLE "tenants" DROP COLUMN "tenant_address_id",
DROP COLUMN "tenant_status_id",
ADD COLUMN     "cnpj" TEXT,
ALTER COLUMN "name" SET NOT NULL;

-- DropTable
DROP TABLE "tenant_address";
