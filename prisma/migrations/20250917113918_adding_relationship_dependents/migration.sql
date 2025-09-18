-- AlterTable
ALTER TABLE "dependents" ADD COLUMN     "dependent_relationship_id" TEXT;

-- CreateTable
CREATE TABLE "dependent_relationships" (
    "id" TEXT NOT NULL,
    "nme" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "dependent_relationships_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "dependent_relationships_nme_key" ON "dependent_relationships"("nme");

-- AddForeignKey
ALTER TABLE "dependents" ADD CONSTRAINT "dependents_dependent_relationship_id_fkey" FOREIGN KEY ("dependent_relationship_id") REFERENCES "dependent_relationships"("id") ON DELETE SET NULL ON UPDATE CASCADE;
