import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist/decorators';
import { UuidSchema } from 'src/utils/uuid-type';
import { ItensServico, ItensServicoSchema } from './itens-servico.interface';
import { ItensServicoService } from './itens-servico.service';

@Controller('itens-servico')
@ApiTags("Itens Serviço")
export class ItensServicoController {
  constructor(private itensServico: ItensServicoService) {}

  @Get()
  async getAll() {
    return await this.itensServico.getAll();
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    UuidSchema.parse({ id });
    return await this.itensServico.get(id);
  }

  @Post()
  @HttpCode(201)
  async post(@Body() body: ItensServico) {
    const itemServico = ItensServicoSchema.parse(body);
    return await this.itensServico.post(itemServico);
  }

  @Put(':id')
  async put(@Param('id') id: string, @Body() body: ItensServico) {
    UuidSchema.parse({ id });
    const itemServico = ItensServicoSchema.partial().parse(body);
    return await this.itensServico.put(id, itemServico);
  }

  @Delete(':id')
  async delete(@Param('id') id:string) {
    UuidSchema.parse({id})
    return await this.itensServico.delete(id)
  }
}
