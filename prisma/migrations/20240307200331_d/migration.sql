/*
  Warnings:

  - You are about to drop the column `extraData` on the `Company` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Company" DROP COLUMN "extraData";

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "extraData" JSONB;
