import { Injectable, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import { scryptSync, timingSafeEqual } from 'crypto';
// import * as jwt from 'jsonwebtoken';
import { ApiError } from 'src/utils/MsgError';
import { Cliente } from '../cadastro/cliente.interface';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaClient, private jwtService: JwtService) {}

  async getCliente(cliente: Cliente) {
    const userFinded = await this.prisma.cliente.findUnique({
      where: { login: cliente.login },
    });
    if (userFinded) {
      const autenticado = this.autenticarUser(cliente.senha, userFinded);
      if (autenticado) {
        const tokenJwt = this.jwtService.sign(
          { nomeUsuario: cliente.login, sub: userFinded.id },
          { secret: 'segredosupersecreto', expiresIn: '2h' },
        );
        const jwt = this.jwtService.verify(tokenJwt, {secret: 'segredosupersecreto'})
        console.log(jwt)
        return { id: userFinded.id, login: userFinded.login, jwt: tokenJwt };
      } else {
        throw new UnauthorizedException();
      }
    } else {
      throw new ApiError('User not found', HttpStatus.NOT_FOUND);
    }
  }

  private autenticarUser(password, user) {
    const hashTest = scryptSync(password, user.salSenha, 64);
    const hashReal = Buffer.from(user.hashSenha, 'hex');
    const autenticado = timingSafeEqual(hashTest, hashReal);

    return autenticado;
  }

  private gerarJWT(payload) {
    const tokenJwt = this.jwtService.sign(payload, {
      secret: process.env.SEGREDO_JWT,
      expiresIn: '1h',
    });
    return tokenJwt;
  }

  teste() {
    console.log('teste');
  }
}
