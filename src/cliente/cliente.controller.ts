import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist/decorators';
import { UuidSchema } from 'src/utils/uuid-type';
import {
  ClienteAtendimento,
  ClienteAtendimentoSchema,
} from './cliente-atendimentos.interface';
import { ClienteService } from './cliente.service';

@Controller('cliente')
@ApiTags("cliente")
export class ClienteController {
  constructor(private clienteService: ClienteService) {}

  @Get(':id')
  async get(@Param('id') id: string) {
    return await this.clienteService.get(id);
  }

  @Get()
  async getAll() {
    return await this.clienteService.getAll();
  }

  @Put('atendimentos')
  async addAtendimentos(@Body() body: ClienteAtendimento) {
    ClienteAtendimentoSchema.parse(body);
    return await this.clienteService.addAtendimento(body.id, body.atendimentos);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    UuidSchema.parse({ id });
    return await this.clienteService.delete(id);
  }
}
