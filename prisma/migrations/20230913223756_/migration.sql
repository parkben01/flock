/*
  Warnings:

  - You are about to drop the column `student` on the `Person` table. All the data in the column will be lost.
  - Made the column `start` on table `Event` required. This step will fail if there are existing NULL values in that column.
  - Made the column `end` on table `Event` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "start" SET NOT NULL,
ALTER COLUMN "end" SET NOT NULL;

-- AlterTable
ALTER TABLE "Person" DROP COLUMN "student";

-- CreateTable
CREATE TABLE "Student" (
    "personId" TEXT NOT NULL,
    "hsGradYear" INTEGER,
    "school" TEXT
);

-- CreateTable
CREATE TABLE "User" (
    "userId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_personId_key" ON "Student"("personId");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
