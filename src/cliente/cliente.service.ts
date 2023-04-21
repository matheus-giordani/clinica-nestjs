import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ClienteService {
  constructor(private prisma: PrismaClient) {}

  getAll() {
    return this.prisma.cliente.findMany({
      include: { atendimentos: true },
    });
  }

  get(id: string) {
    return this.prisma.cliente.findUnique({
      where: { id },
      include: { atendimentos: true },
    });
  }

  delete(id: string) {
    return this.prisma.cliente.delete({
      where: {
        id,
      },
    });
  }

  addAtendimento(idCliente: string, idsAtendimentos: string[]) {
    const atendimentos = idsAtendimentos.map((id) => ({ id }));
    return this.prisma.cliente.update({
      where: { id: idCliente },
      data: {
        atendimentos: {
          connect: atendimentos,
        },
      },
      include: { atendimentos: true },
    });
  }
}
