/*
  Warnings:

  - You are about to alter the column `cost` on the `product` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `product` MODIFY `cost` DOUBLE NOT NULL;
