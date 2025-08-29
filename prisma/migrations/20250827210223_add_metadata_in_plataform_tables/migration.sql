/*
  Warnings:

  - You are about to drop the `client_authentication_codes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "client_authentication_codes" DROP CONSTRAINT "client_authentication_codes_client_id_fkey";

-- AlterTable
ALTER TABLE "clients" ALTER COLUMN "email" DROP NOT NULL;

-- DropTable
DROP TABLE "client_authentication_codes";

-- CreateTable
CREATE TABLE "plataform_authentication_data" (
    "id" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "provider_service" TEXT NOT NULL,
    "meta_data" JSONB,
    "authorization_token" TEXT NOT NULL,

    CONSTRAINT "plataform_authentication_data_pkey" PRIMARY KEY ("id")
);
