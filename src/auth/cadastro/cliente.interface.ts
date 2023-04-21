import { z } from 'zod';

export const ClienteBodySchema = z.object({
  login: z.string(),
  senha: z.string(),
});

export type Cliente = z.infer<typeof ClienteBodySchema>;
