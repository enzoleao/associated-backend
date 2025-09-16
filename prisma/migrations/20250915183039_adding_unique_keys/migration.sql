/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `associate_plans` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `associate_status` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "associate_plans_name_key" ON "associate_plans"("name");

-- CreateIndex
CREATE UNIQUE INDEX "associate_status_name_key" ON "associate_status"("name");
