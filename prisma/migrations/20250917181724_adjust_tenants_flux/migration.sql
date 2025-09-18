/*
  Warnings:

  - A unique constraint covering the columns `[identification]` on the table `tenants` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "users_email_key";

-- AlterTable
ALTER TABLE "tenants" ADD COLUMN     "identification" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "tenants_identification_key" ON "tenants"("identification");
