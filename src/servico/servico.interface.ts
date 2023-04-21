import { ItensServicoSchema } from 'src/itens-servico/itens-servico.interface';
import { z } from 'zod';

export const ServicoSchema = z.object({
  nome: z.string(),
  valor: z.number(),
  tempo: z.number(),
  clinicaId: z.string(),
  itensServico: z.array(ItensServicoSchema).optional(),
});

export type Servico = z.infer<typeof ServicoSchema>