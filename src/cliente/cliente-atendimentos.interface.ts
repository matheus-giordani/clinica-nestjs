import { z } from 'zod';

export const ClienteAtendimentoSchema = z.object({
  id: z.string().uuid(),
  atendimentos: z.array(z.string().uuid()),
});

export type ClienteAtendimento = z.infer<typeof ClienteAtendimentoSchema>;
