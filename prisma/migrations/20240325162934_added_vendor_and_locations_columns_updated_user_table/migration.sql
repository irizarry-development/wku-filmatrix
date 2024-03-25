-- AlterTable
ALTER TABLE "User" ADD COLUMN     "biography" TEXT,
ADD COLUMN     "classYear" TEXT,
ADD COLUMN     "degree" TEXT;

-- CreateTable
CREATE TABLE "Location" (
    "id" TEXT NOT NULL,
    "locationName" TEXT NOT NULL,
    "locationAddress" TEXT NOT NULL,
    "locationKeywords" TEXT NOT NULL,
    "locationImage" TEXT NOT NULL,
    "locationDescription" TEXT NOT NULL,
    "locationPhone" TEXT NOT NULL,
    "locationEmail" TEXT NOT NULL,
    "locationContactName" TEXT NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vendor" (
    "id" TEXT NOT NULL,
    "vendorName" TEXT NOT NULL,
    "vendorAddress" TEXT NOT NULL,
    "vendorKeywords" TEXT NOT NULL,
    "vendorDescription" TEXT NOT NULL,
    "vendorPhone" TEXT NOT NULL,
    "vendorEmail" TEXT NOT NULL,
    "vendorContactName" TEXT NOT NULL,

    CONSTRAINT "Vendor_pkey" PRIMARY KEY ("id")
);
