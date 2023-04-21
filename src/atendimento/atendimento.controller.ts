import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put
} from '@nestjs/common';
import { HttpCode } from '@nestjs/common/decorators/http/http-code.decorator';
import { ApiBody } from '@nestjs/swagger';
import { ApiTags } from '@nestjs/swagger/dist';
import { UuidSchema } from 'src/utils/uuid-type';
import { Atendimento, AtendimentoSchema } from './atendimento.interface';
import { AtendimentoService } from './atendimento.service';

@Controller('atendimento')
@ApiTags('atendimento')
export class AtendimentoController {
  constructor(private atendimentoService: AtendimentoService) {}

  @Post()
  @HttpCode(201)
  public async post(@Body() body: Atendimento) {
    const atendimento = AtendimentoSchema.parse(body);
    return await this.atendimentoService.post(atendimento);
  }
  @Get(':id')
  async get(@Param('id') id: string) {
    UuidSchema.parse({ id });
    return await this.atendimentoService.get(id);
  }

  @Get()
  public async getAll() {
    return await this.atendimentoService.getAll();
  }

  @Post('servicos')
  public async addItensServicos(
    @Body() body: { atendimentoId: string; idsString: string[] },
  ) {
    return await this.atendimentoService.addItensServico(
      body.atendimentoId,
      body.idsString,
    );
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    UuidSchema.parse({ id });
    return await this.atendimentoService.delete(id);
  }

  @Put(':id')
  async put(@Param('id') id: string, @Body() body: Atendimento) {
    UuidSchema.parse({ id });
    const atendimento = AtendimentoSchema.partial().parse(body);
    return await this.atendimentoService.put(id, atendimento);
  }

  @Put(':id/concluir')
  async concluiAtendimento(@Param('id') id: string) {
    UuidSchema.parse({ id });
    return await this.atendimentoService.put(id, {
      concluido: true,
      fim: new Date(),
    });
  }
}
