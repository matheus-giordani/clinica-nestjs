import { z } from 'zod';

export const UuidSchema = z.object({
  id: z.string().uuid(),
});

export type Uuid = z.infer<typeof UuidSchema>;
