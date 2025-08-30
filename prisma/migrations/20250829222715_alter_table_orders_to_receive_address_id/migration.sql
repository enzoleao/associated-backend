-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "client_address_id" TEXT;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_client_address_id_fkey" FOREIGN KEY ("client_address_id") REFERENCES "client_address"("id") ON DELETE SET NULL ON UPDATE CASCADE;
