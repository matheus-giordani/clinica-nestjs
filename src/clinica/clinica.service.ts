import { PrismaClient } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ClinicaService {
  constructor(private prisma: PrismaClient) {}
  post(clinica) {
    return this.prisma.clinica.create({
      data: clinica,
    });
  }

  getAll() {
    return this.prisma.clinica.findMany({
      include: { Atendimentos: true, servicos: true },
    });
  }
  get(id: string) {
    return this.prisma.clinica.findUnique({
      where: { id },
      include: { Atendimentos: true, servicos: true },
    });
  }

  put(id: string, clinica) {
    return this.prisma.clinica.update({
      where: { id },
      data: clinica,
      include: { Atendimentos: true, servicos: true },
    });
  }
  delete(id: string) {
    return this.prisma.clinica.delete({
      where: { id },
    });
  }
}
