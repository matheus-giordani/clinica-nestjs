/*
  Warnings:

  - You are about to drop the `Atendimento` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Cliente` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Clinica` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ItensDeServico` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profissional` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Servico` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Atendimento" DROP CONSTRAINT "Atendimento_clienteId_fkey";

-- DropForeignKey
ALTER TABLE "Atendimento" DROP CONSTRAINT "Atendimento_clinicaId_fkey";

-- DropForeignKey
ALTER TABLE "ItensDeServico" DROP CONSTRAINT "ItensDeServico_atendimentoId_fkey";

-- DropForeignKey
ALTER TABLE "ItensDeServico" DROP CONSTRAINT "ItensDeServico_profissionalId_fkey";

-- DropForeignKey
ALTER TABLE "ItensDeServico" DROP CONSTRAINT "ItensDeServico_servicoId_fkey";

-- DropForeignKey
ALTER TABLE "Servico" DROP CONSTRAINT "Servico_clinicaId_fkey";

-- DropTable
DROP TABLE "Atendimento";

-- DropTable
DROP TABLE "Cliente";

-- DropTable
DROP TABLE "Clinica";

-- DropTable
DROP TABLE "ItensDeServico";

-- DropTable
DROP TABLE "Profissional";

-- DropTable
DROP TABLE "Servico";

-- CreateTable
CREATE TABLE "cliente" (
    "id" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "hashSenha" TEXT NOT NULL,
    "salSenha" TEXT NOT NULL,

    CONSTRAINT "cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clinica" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "clinica_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "servico" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "tempo" INTEGER NOT NULL,
    "clinicaId" TEXT NOT NULL,

    CONSTRAINT "servico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profissional" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "profissional_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "atendimento" (
    "id" TEXT NOT NULL,
    "clienteId" TEXT NOT NULL,
    "clinicaId" TEXT NOT NULL,
    "inicio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fim" TIMESTAMP(3),
    "concluido" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "atendimento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "itens-servico" (
    "id" TEXT NOT NULL,
    "atendimentoId" TEXT NOT NULL,
    "servicoId" TEXT NOT NULL,
    "profissionalId" TEXT NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "comissao" DOUBLE PRECISION NOT NULL DEFAULT 0.1,

    CONSTRAINT "itens-servico_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cliente_login_key" ON "cliente"("login");

-- AddForeignKey
ALTER TABLE "servico" ADD CONSTRAINT "servico_clinicaId_fkey" FOREIGN KEY ("clinicaId") REFERENCES "clinica"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "atendimento" ADD CONSTRAINT "atendimento_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "cliente"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "atendimento" ADD CONSTRAINT "atendimento_clinicaId_fkey" FOREIGN KEY ("clinicaId") REFERENCES "clinica"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itens-servico" ADD CONSTRAINT "itens-servico_atendimentoId_fkey" FOREIGN KEY ("atendimentoId") REFERENCES "atendimento"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itens-servico" ADD CONSTRAINT "itens-servico_servicoId_fkey" FOREIGN KEY ("servicoId") REFERENCES "servico"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itens-servico" ADD CONSTRAINT "itens-servico_profissionalId_fkey" FOREIGN KEY ("profissionalId") REFERENCES "profissional"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
