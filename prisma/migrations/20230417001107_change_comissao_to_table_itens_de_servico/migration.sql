/*
  Warnings:

  - You are about to drop the column `comissao` on the `Profissional` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ItensDeServico" ADD COLUMN     "comissao" DOUBLE PRECISION NOT NULL DEFAULT 0.1;

-- AlterTable
ALTER TABLE "Profissional" DROP COLUMN "comissao";
