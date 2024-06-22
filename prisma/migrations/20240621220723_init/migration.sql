-- AlterTable
ALTER TABLE "Products" ALTER COLUMN "stock" DROP NOT NULL,
ALTER COLUMN "stock" SET DEFAULT true;
