/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `clients` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone_number]` on the table `clients` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `clients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "client_address" ALTER COLUMN "address_description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "clients" ADD COLUMN     "email" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "client_authentication_codes" (
    "id" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "expiration_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "client_authentication_codes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "clients_email_key" ON "clients"("email");

-- CreateIndex
CREATE UNIQUE INDEX "clients_phone_number_key" ON "clients"("phone_number");

-- AddForeignKey
ALTER TABLE "client_authentication_codes" ADD CONSTRAINT "client_authentication_codes_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
