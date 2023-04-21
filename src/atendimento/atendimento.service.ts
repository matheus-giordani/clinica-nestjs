import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import { ApiError } from 'src/utils/MsgError';

@Injectable()
export class AtendimentoService {
  constructor(private prisma: PrismaService) {}

  post(atendimento) {
    
    return this.prisma.atendimento.create({
      data: atendimento,
    });
  }

  getAll() {
    return this.prisma.atendimento.findMany({
      include: { cliente: true, clinica: true, itensDeServico: true },
    });
  }

  get(id: string) {
    return this.prisma.atendimento.findUnique({
      where: { id },
      include: { cliente: true, clinica: true, itensDeServico: true },
    });
  }

  async put(id: string, data) {
    const atendimento = await this.get(id)
    if(atendimento && atendimento.concluido){
      throw new ApiError(
        'Atendimento já concluído não é possivel alterar ou deletar itens de serviço',
        HttpStatus.FORBIDDEN,
      );
    }
    return this.prisma.atendimento.update({
      where: { id },
      data: data,
    });
  }

  delete(id: string) {
    return this.prisma.atendimento.delete({
      where: { id },
    });
  }

  addItensServico(idAtendimento: string, idsItemServico: string[]) {
    const itensDeServico = idsItemServico.map((id) => ({ id }));
    return this.prisma.atendimento.update({
      where: { id: idAtendimento },
      data: {
        itensDeServico: {
          connect: itensDeServico,
        },
      },
      include: { itensDeServico: true },
    });
  }

 
}
