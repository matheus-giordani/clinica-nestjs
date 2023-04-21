-- DropForeignKey
ALTER TABLE "Atendimento" DROP CONSTRAINT "Atendimento_clienteId_fkey";

-- DropForeignKey
ALTER TABLE "Atendimento" DROP CONSTRAINT "Atendimento_clinicaId_fkey";

-- DropForeignKey
ALTER TABLE "Servico" DROP CONSTRAINT "Servico_clinicaId_fkey";

-- AlterTable
ALTER TABLE "Atendimento" ALTER COLUMN "inicio" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Profissional" ALTER COLUMN "comissao" SET DEFAULT 0.1;

-- AddForeignKey
ALTER TABLE "Servico" ADD CONSTRAINT "Servico_clinicaId_fkey" FOREIGN KEY ("clinicaId") REFERENCES "Clinica"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Atendimento" ADD CONSTRAINT "Atendimento_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Atendimento" ADD CONSTRAINT "Atendimento_clinicaId_fkey" FOREIGN KEY ("clinicaId") REFERENCES "Clinica"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
