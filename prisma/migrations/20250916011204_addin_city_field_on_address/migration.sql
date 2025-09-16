/*
  Warnings:

  - Added the required column `city` to the `associate_address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "associate_address" ADD COLUMN     "city" TEXT NOT NULL;
