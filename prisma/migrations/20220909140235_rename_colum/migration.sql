/*
  Warnings:

  - You are about to drop the column `timeStamp` on the `AccessLog` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AccessLog" DROP COLUMN "timeStamp",
ADD COLUMN     "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
