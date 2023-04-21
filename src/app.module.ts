import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { PrismaClient } from '@prisma/client';
import { AppController } from './app.controller';
import { AtendimentoController } from './atendimento/atendimento.controller';
import { AtendimentoService } from './atendimento/atendimento.service';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/Jwt-auth-guard';
import { ClienteController } from './cliente/cliente.controller';
import { ClienteService } from './cliente/cliente.service';
import { ClinicaController } from './clinica/clinica.controller';
import { ClinicaService } from './clinica/clinica.service';
import { ApiErrorExceptionFilter } from './common/error-handler/api-error-handler.filter';
import { FilterExecptionHTTP } from './common/error-handler/error-handler-http.filter';
import { PrismaExceptionFilter } from './common/error-handler/prisma-handler.filter';
import { ZodExceptionFilter } from './common/error-handler/type-error-handler.filter';
import { VerifyIdInterceptor } from './common/interceptors/verifyId.interceptor';
import { PrismaService } from './common/prisma.service';
import { ItensServicoController } from './itens-servico/itens-servico.controller';
import { ItensServicoService } from './itens-servico/itens-servico.service';
import { ProfissionalController } from './profissional/profissional.controller';
import { ProfissionalService } from './profissional/profissional.service';
import { ServicoController } from './servico/servico.controller';
import { ServicoService } from './servico/servico.service';

@Module({
  imports: [AuthModule,],
  controllers: [
    AppController,
    ClienteController,
    ClinicaController,
    ServicoController,
    ProfissionalController,
    AtendimentoController,
    ItensServicoController,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: FilterExecptionHTTP,
    },
    {
      provide: APP_FILTER,
      useClass: ZodExceptionFilter,
    },
    { provide: APP_FILTER, useClass: PrismaExceptionFilter },
    {provide: APP_FILTER, useClass: ApiErrorExceptionFilter},
    {provide: APP_INTERCEPTOR, useClass: VerifyIdInterceptor},
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    AtendimentoService,
    PrismaClient,
    PrismaService,
    ClienteService,
    ClinicaService,
    ProfissionalService,
    ServicoService,
    ItensServicoService,
  ],
})
export class AppModule {}
