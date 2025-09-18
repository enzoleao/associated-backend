/*
  Warnings:

  - The primary key for the `dependent_relationships` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `dependent_relationships` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `dependent_relationship_id` column on the `dependents` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "dependents" DROP CONSTRAINT "dependents_dependent_relationship_id_fkey";

-- AlterTable
ALTER TABLE "dependent_relationships" DROP CONSTRAINT "dependent_relationships_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "dependent_relationships_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "dependents" DROP COLUMN "dependent_relationship_id",
ADD COLUMN     "dependent_relationship_id" INTEGER;

-- AddForeignKey
ALTER TABLE "dependents" ADD CONSTRAINT "dependents_dependent_relationship_id_fkey" FOREIGN KEY ("dependent_relationship_id") REFERENCES "dependent_relationships"("id") ON DELETE SET NULL ON UPDATE CASCADE;
