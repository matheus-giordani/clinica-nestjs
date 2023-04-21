import { z } from 'zod';

export const ClinicaSchema = z.object({
  nome: z.string(),
});

export type Clinica = z.infer<typeof ClinicaSchema>;
