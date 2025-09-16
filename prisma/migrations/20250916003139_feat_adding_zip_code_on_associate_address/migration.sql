/*
  Warnings:

  - Added the required column `zip_code` to the `associate_address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "associate_address" ADD COLUMN     "zip_code" TEXT NOT NULL;
