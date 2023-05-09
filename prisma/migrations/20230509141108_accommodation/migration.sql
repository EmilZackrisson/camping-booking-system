/*
  Warnings:

  - Added the required column `accommodation` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Booking" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "arrivalDate" DATETIME NOT NULL,
    "departureDate" DATETIME NOT NULL,
    "notes" TEXT,
    "customerId" TEXT NOT NULL,
    "numberOfPersons" INTEGER NOT NULL,
    "paymentStatus" TEXT NOT NULL DEFAULT 'unpaid',
    "paymentMethod" TEXT,
    "paymentAmount" INTEGER,
    "paymentCurrency" TEXT,
    "confirmed" BOOLEAN NOT NULL DEFAULT false,
    "accommodation" TEXT NOT NULL,
    CONSTRAINT "Booking_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Booking" ("arrivalDate", "confirmed", "createdAt", "customerId", "departureDate", "id", "notes", "numberOfPersons", "paymentAmount", "paymentCurrency", "paymentMethod", "paymentStatus", "updatedAt") SELECT "arrivalDate", "confirmed", "createdAt", "customerId", "departureDate", "id", "notes", "numberOfPersons", "paymentAmount", "paymentCurrency", "paymentMethod", "paymentStatus", "updatedAt" FROM "Booking";
DROP TABLE "Booking";
ALTER TABLE "new_Booking" RENAME TO "Booking";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
