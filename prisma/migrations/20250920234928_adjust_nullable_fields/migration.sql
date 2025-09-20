-- DropForeignKey
ALTER TABLE "associate_address" DROP CONSTRAINT "associate_address_country_state_id_fkey";

-- AlterTable
ALTER TABLE "associate_address" ALTER COLUMN "street" DROP NOT NULL,
ALTER COLUMN "neighborhood" DROP NOT NULL,
ALTER COLUMN "city" DROP NOT NULL,
ALTER COLUMN "number" DROP NOT NULL,
ALTER COLUMN "zip_code" DROP NOT NULL,
ALTER COLUMN "country_state_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "associate_address" ADD CONSTRAINT "associate_address_country_state_id_fkey" FOREIGN KEY ("country_state_id") REFERENCES "country_states"("id") ON DELETE SET NULL ON UPDATE CASCADE;
