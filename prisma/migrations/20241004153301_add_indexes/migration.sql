/*
  Warnings:

  - You are about to drop the column `academicYear` on the `enrollments` table. All the data in the column will be lost.
  - You are about to drop the column `paidAmount` on the `enrollments` table. All the data in the column will be lost.
  - You are about to drop the column `totalFee` on the `enrollments` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `schools` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[studentId,academicYearId,schoolId]` on the table `enrollments` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,studentId,classId,courseId]` on the table `grades` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `parents` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[addressId]` on the table `parents` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[reference]` on the table `payments` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[addressId]` on the table `schools` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,addressId]` on the table `schools` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `staff` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `academicYearId` to the `enrollments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentId` to the `grades` table without a default value. This is not possible if the table is not empty.
  - Added the required column `addressId` to the `parents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `parents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `addressId` to the `schools` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `staff` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "grades" DROP CONSTRAINT "grades_classId_fkey";

-- DropIndex
DROP INDEX "enrollments_studentId_academicYear_schoolId_key";

-- DropIndex
DROP INDEX "grades_name_classId_key";

-- DropIndex
DROP INDEX "schools_name_address_key";

-- AlterTable
ALTER TABLE "enrollments" DROP COLUMN "academicYear",
DROP COLUMN "paidAmount",
DROP COLUMN "totalFee",
ADD COLUMN     "academicYearId" TEXT NOT NULL,
ADD COLUMN     "balance" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "grades" ADD COLUMN     "courseId" TEXT,
ADD COLUMN     "studentId" TEXT NOT NULL,
ALTER COLUMN "classId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "parents" ADD COLUMN     "addressId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "payments" ADD COLUMN     "reference" TEXT;

-- AlterTable
ALTER TABLE "schools" DROP COLUMN "address",
ADD COLUMN     "addressId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "staff" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "academic_years" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "schoolId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "academic_years_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "addresses" (
    "id" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT,
    "zipCode" TEXT,
    "country" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "academic_years_name_schoolId_key" ON "academic_years"("name", "schoolId");

-- CreateIndex
CREATE INDEX "enrollments_studentId_idx" ON "enrollments"("studentId");

-- CreateIndex
CREATE INDEX "enrollments_schoolId_idx" ON "enrollments"("schoolId");

-- CreateIndex
CREATE UNIQUE INDEX "enrollments_studentId_academicYearId_schoolId_key" ON "enrollments"("studentId", "academicYearId", "schoolId");

-- CreateIndex
CREATE INDEX "grades_classId_idx" ON "grades"("classId");

-- CreateIndex
CREATE INDEX "grades_courseId_idx" ON "grades"("courseId");

-- CreateIndex
CREATE UNIQUE INDEX "grades_name_studentId_classId_courseId_key" ON "grades"("name", "studentId", "classId", "courseId");

-- CreateIndex
CREATE UNIQUE INDEX "parents_userId_key" ON "parents"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "parents_addressId_key" ON "parents"("addressId");

-- CreateIndex
CREATE UNIQUE INDEX "payments_reference_key" ON "payments"("reference");

-- CreateIndex
CREATE INDEX "payments_enrollmentId_idx" ON "payments"("enrollmentId");

-- CreateIndex
CREATE UNIQUE INDEX "schools_addressId_key" ON "schools"("addressId");

-- CreateIndex
CREATE UNIQUE INDEX "schools_name_addressId_key" ON "schools"("name", "addressId");

-- CreateIndex
CREATE UNIQUE INDEX "staff_userId_key" ON "staff"("userId");

-- AddForeignKey
ALTER TABLE "schools" ADD CONSTRAINT "schools_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parents" ADD CONSTRAINT "parents_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parents" ADD CONSTRAINT "parents_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grades" ADD CONSTRAINT "grades_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grades" ADD CONSTRAINT "grades_classId_fkey" FOREIGN KEY ("classId") REFERENCES "classes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grades" ADD CONSTRAINT "grades_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_academicYearId_fkey" FOREIGN KEY ("academicYearId") REFERENCES "academic_years"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staff" ADD CONSTRAINT "staff_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "academic_years" ADD CONSTRAINT "academic_years_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "schools"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
