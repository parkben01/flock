/*
  Warnings:

  - Made the column `createdAt` on table `Persons` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Persons" ALTER COLUMN "createdAt" SET NOT NULL;
