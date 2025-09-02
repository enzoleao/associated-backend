/*
  Warnings:

  - You are about to drop the column `address_description` on the `client_address` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "client_address" DROP COLUMN "address_description",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "neighborhood" TEXT,
ADD COLUMN     "number" TEXT;
