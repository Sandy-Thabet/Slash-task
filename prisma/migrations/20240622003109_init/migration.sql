-- AlterTable
ALTER TABLE "Orders" ADD COLUMN     "couponId" INTEGER;

-- CreateTable
CREATE TABLE "Coupons" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "discountPercentage" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Coupons_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Coupons_code_key" ON "Coupons"("code");

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_couponId_fkey" FOREIGN KEY ("couponId") REFERENCES "Coupons"("id") ON DELETE CASCADE ON UPDATE CASCADE;
