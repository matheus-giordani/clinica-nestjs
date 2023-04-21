import { ItensServicoSchema } from './../itens-servico/itens-servico.interface';
import { z } from 'zod';
import { zodToSwagger } from 'src/utils/zodToSwagger';


export const AtendimentoSchema = z.object({

  clienteId: z.string().uuid(),
  clinicaId: z.string().uuid(),
  inicio: z.string().datetime(),
  itensServico: z.array(ItensServicoSchema).optional(),
});

export type Atendimento = z.infer<typeof AtendimentoSchema>;

export class AtendimentoDto {
  constructor(data: Atendimento) {
    Object.assign(this,data)
  }
}
{

}

zodToSwagger(AtendimentoSchema)