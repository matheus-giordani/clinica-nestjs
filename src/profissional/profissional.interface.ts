import { ItensServicoSchema } from 'src/itens-servico/itens-servico.interface';
import { z } from 'zod';

export const ProfissionalSchema = z.object({
  nome: z.string(),
  itensservico: z.array(ItensServicoSchema).optional(),
});

export type Profissional = z.infer<typeof ProfissionalSchema>