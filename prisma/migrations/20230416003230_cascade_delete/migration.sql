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

-- AddForeignKey
ALTER TABLE "Servico" ADD CONSTRAINT "Servico_clinicaId_fkey" FOREIGN KEY ("clinicaId") REFERENCES "Clinica"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Atendimento" ADD CONSTRAINT "Atendimento_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Atendimento" ADD CONSTRAINT "Atendimento_clinicaId_fkey" FOREIGN KEY ("clinicaId") REFERENCES "Clinica"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItensDeServico" ADD CONSTRAINT "ItensDeServico_atendimentoId_fkey" FOREIGN KEY ("atendimentoId") REFERENCES "Atendimento"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItensDeServico" ADD CONSTRAINT "ItensDeServico_servicoId_fkey" FOREIGN KEY ("servicoId") REFERENCES "Servico"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItensDeServico" ADD CONSTRAINT "ItensDeServico_profissionalId_fkey" FOREIGN KEY ("profissionalId") REFERENCES "Profissional"("id") ON DELETE CASCADE ON UPDATE CASCADE;
