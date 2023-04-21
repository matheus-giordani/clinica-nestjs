-- DropForeignKey
ALTER TABLE "ItensDeServico" DROP CONSTRAINT "ItensDeServico_profissionalId_fkey";

-- DropForeignKey
ALTER TABLE "ItensDeServico" DROP CONSTRAINT "ItensDeServico_servicoId_fkey";

-- AddForeignKey
ALTER TABLE "ItensDeServico" ADD CONSTRAINT "ItensDeServico_servicoId_fkey" FOREIGN KEY ("servicoId") REFERENCES "Servico"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItensDeServico" ADD CONSTRAINT "ItensDeServico_profissionalId_fkey" FOREIGN KEY ("profissionalId") REFERENCES "Profissional"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
