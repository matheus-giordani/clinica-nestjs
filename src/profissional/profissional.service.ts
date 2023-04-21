import { ItensServico } from './../itens-servico/itens-servico.interface';
import { PrismaClient } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProfissionalService {
  constructor(private prisma: PrismaClient) {}

  getAll() {
    return this.prisma.profissional.findMany({
      include: { itensDeServico: true },
    });
  }
  get(id: string) {
    return this.prisma.profissional.findUnique({
      where: { id },
    });
  }

  post(profissional) {
    return this.prisma.profissional.create({
      data: profissional,
    });
  }

  put(id: string, profissional) {
    return this.prisma.profissional.update({
      where: { id },
      data: profissional,
    });
  }

  delete(id: string) {
    return this.prisma.profissional.delete({
      where: { id },
    });
  }

  async calcComissao(id: string){
    const profissional = await this.prisma.profissional.findUnique({
        where:{id},
        include:{itensDeServico: true}
    })
    if(profissional){
        const sumComissao = profissional.itensDeServico.reduce((acumulador, itemServico )=>{
            return acumulador + (itemServico.valor * itemServico.comissao)
           
        }, 0)
        const valorAhReceber = (sumComissao).toFixed(2)
        return {...profissional, valor_receber: valorAhReceber}
    }
    
  }
}
