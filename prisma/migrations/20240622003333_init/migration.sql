/*
  Warnings:

  - Added the required column `subTotal` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Orders" ADD COLUMN     "discount" DOUBLE PRECISION,
ADD COLUMN     "subTotal" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "total" DOUBLE PRECISION NOT NULL;
