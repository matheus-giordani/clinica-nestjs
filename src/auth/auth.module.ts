import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaClient } from '@prisma/client';
import { CadastroController } from './cadastro/cadastro.controller';
import { CadastroService } from './cadastro/cadastro.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './login/auth.controller';
import { AuthService } from './login/auth.service';

@Module({
  controllers: [CadastroController, AuthController],
  imports: [
    PassportModule,
    JwtModule.register({
      global: true,
      secret: process.env.SEGREDO_JWT,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [JwtStrategy, AuthService, CadastroService, PrismaClient],
})
export class AuthModule {}
