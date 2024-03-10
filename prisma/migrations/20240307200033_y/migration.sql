/*
  Warnings:

  - You are about to drop the column `data` on the `Service` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "extraData" JSONB;

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "data";
