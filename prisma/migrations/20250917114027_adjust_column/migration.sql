/*
  Warnings:

  - You are about to drop the column `nme` on the `dependent_relationships` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `dependent_relationships` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `dependent_relationships` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "dependent_relationships_nme_key";

-- AlterTable
ALTER TABLE "dependent_relationships" DROP COLUMN "nme",
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "dependent_relationships_name_key" ON "dependent_relationships"("name");
