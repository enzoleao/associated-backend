/*
  Warnings:

  - Added the required column `associate_status_id` to the `associates` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "associates" ADD COLUMN     "associate_status_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "associate_status" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "associate_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "associate_plans" (
    "id" TEXT NOT NULL,
    "tenant_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "associate_plans_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "associate_plans" ADD CONSTRAINT "associate_plans_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "associates" ADD CONSTRAINT "associates_associate_status_id_fkey" FOREIGN KEY ("associate_status_id") REFERENCES "associate_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
