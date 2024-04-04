/*
  Warnings:

  - A unique constraint covering the columns `[projectProductionNumber]` on the table `Project` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Project_projectProductionNumber_key" ON "Project"("projectProductionNumber");
