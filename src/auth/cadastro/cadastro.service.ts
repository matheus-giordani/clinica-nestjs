import { Injectable, HttpStatus } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { randomBytes, scryptSync } from 'crypto';
import { ApiError } from 'src/utils/MsgError';

@Injectable()
export class CadastroService {
  constructor(private prisma: PrismaClient) {}

  async post(cliente: { login: string; senha: string }) {
    const res = await this.searchUser(cliente.login);
    if (res === null) {
      const { login, senha } = cliente;
      const { hashSenha, salSenha } = this.criaHashSalSenha(senha);
      const clienteDb = { login, hashSenha, salSenha };
      return this.prisma.cliente.create({
        data: clienteDb,
      });
    } else {
      throw new ApiError('user has already been created', HttpStatus.CONFLICT);
    }
  }

  criaHashSalSenha(senha: string) {
    const salSenha = randomBytes(16).toString('hex');
    const hashSenha = scryptSync(senha, salSenha, 64).toString('hex');
    return { hashSenha, salSenha };
  }

  private searchUser(login: string) {
    return this.prisma.cliente.findFirst({
      where: { login },
    });
  }
}
