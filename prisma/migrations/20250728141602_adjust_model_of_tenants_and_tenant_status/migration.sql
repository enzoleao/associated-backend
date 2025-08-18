-- DropForeignKey
ALTER TABLE "tenants" DROP CONSTRAINT "tenants_tenant_address_id_fkey";

-- AlterTable
ALTER TABLE "tenants" ADD COLUMN     "is_open" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "tenant_status_id" INTEGER,
ALTER COLUMN "tenant_address_id" DROP NOT NULL;

-- CreateTable
CREATE TABLE "tenant_status" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "tenant_status_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tenants" ADD CONSTRAINT "tenants_tenant_address_id_fkey" FOREIGN KEY ("tenant_address_id") REFERENCES "tenant_address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tenants" ADD CONSTRAINT "tenants_tenant_status_id_fkey" FOREIGN KEY ("tenant_status_id") REFERENCES "tenant_status"("id") ON DELETE SET NULL ON UPDATE CASCADE;
