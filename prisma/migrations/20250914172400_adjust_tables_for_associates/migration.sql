/*
  Warnings:

  - You are about to drop the column `birthday` on the `associates` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `associates` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `associates` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `payment_due_date` to the `associates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment_preference_id` to the `associates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tenant_id` to the `associates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `associates` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "associates" DROP COLUMN "birthday",
DROP COLUMN "name",
ADD COLUMN     "payment_due_date" TEXT NOT NULL,
ADD COLUMN     "payment_preference_id" TEXT NOT NULL,
ADD COLUMN     "tenant_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "birthday" DATE,
ADD COLUMN     "image_path" TEXT;

-- CreateTable
CREATE TABLE "payment_methods" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "payment_code" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "payment_methods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "associate_address" (
    "id" TEXT NOT NULL,
    "associate_id" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "complement" TEXT,
    "country_state_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "associate_address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "country_states" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "initials" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "country_states_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "country_states_initials_key" ON "country_states"("initials");

-- CreateIndex
CREATE UNIQUE INDEX "associates_user_id_key" ON "associates"("user_id");

-- AddForeignKey
ALTER TABLE "associates" ADD CONSTRAINT "associates_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "associates" ADD CONSTRAINT "associates_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "associate_address" ADD CONSTRAINT "associate_address_country_state_id_fkey" FOREIGN KEY ("country_state_id") REFERENCES "country_states"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "associate_address" ADD CONSTRAINT "associate_address_associate_id_fkey" FOREIGN KEY ("associate_id") REFERENCES "associates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
