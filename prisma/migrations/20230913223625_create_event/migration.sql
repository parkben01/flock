/*
  Warnings:

  - You are about to drop the `Student` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_personId_fkey";

-- AlterTable
ALTER TABLE "Person" ADD COLUMN     "student" TEXT;

-- DropTable
DROP TABLE "Student";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Event" (
    "eventId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "start" TEXT,
    "end" TEXT,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("eventId")
);
