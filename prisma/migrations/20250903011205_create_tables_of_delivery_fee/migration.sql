-- CreateTable
CREATE TABLE "tenant_delivery_fee" (
    "id" TEXT NOT NULL,
    "tenant_id" TEXT NOT NULL,
    "max_distance" DOUBLE PRECISION NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "tenant_delivery_fee_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tenant_delivery_fee" ADD CONSTRAINT "tenant_delivery_fee_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
