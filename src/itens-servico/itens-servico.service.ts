import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { catchError } from 'rxjs';
import { ApiError } from 'src/utils/MsgError';

@Injectable()
export class ItensServicoService {
  constructor(private prisma: PrismaClient) {}

  getAll() {
    return this.prisma.itensDeServico.findMany({});
  }
  async get(id: string) {
    const res =  await this.prisma.itensDeServico.findUnique({
      where: { id }   });
      return res
  }
  async post(itemServico) {
    try {        
        await this.checkAtendimentoConcluido(itemServico.atendimentoId)
    } catch (error) {
      throw error
    }

    return this.prisma.itensDeServico.create({
      data: itemServico,
    });
  }
  async put(id: string, itemServico) {
    try {        
        await this.checkAtendimentoConcluido(itemServico.atendimentoId)
    } catch (error) {
      throw error
    }
     this.prisma.itensDeServico.update({
      where: { id },
      data: itemServico,
    });
  }
  async delete(id: string) {
    const itemServico = await this.get(id)
    if(!itemServico){
        throw new ApiError("id not found", HttpStatus.NOT_FOUND)
    }
        try {        
            await this.checkAtendimentoConcluido(itemServico.atendimentoId)
        } catch (error) {
          throw error
        }

    return this.prisma.itensDeServico.delete({
      where: { id },
    });
  }

  async checkAtendimentoConcluido(id: string) {
    const atendimento = await this.prisma.atendimento.findUnique({
        where:{id}
    });
    if (atendimento && atendimento.concluido) {
      throw new ApiError(
        'Atendimento já concluído não é possivel alterar ou deletar itens de serviço',
        HttpStatus.FORBIDDEN,
      );
    }
    
}
}