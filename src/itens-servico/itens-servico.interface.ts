import { z } from 'zod';

export const ItensServicoSchema = z.object({
  atendimentoId: z.string(),
  servicoId: z.string(),
  profissionalId: z.string(),
  valor: z.number(),
});

export type ItensServico = z.infer<typeof ItensServicoSchema>;
