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
import { Profissional, ProfissionalSchema } from './profissional.interface';
import { ProfissionalService } from './profissional.service';

@Controller('profissional')
@ApiTags("profissional")
export class ProfissionalController {
  constructor(private profissionalService: ProfissionalService) {}

  @Get()
  async getAll() {
    return await this.profissionalService.getAll();
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    UuidSchema.parse({ id });
    return await this.profissionalService.get(id);
  }

  @Get(':id/comissao')
  async getValorReceber(@Param('id') id: string) {
    UuidSchema.parse({ id });
    return await this.profissionalService.calcComissao(id)
  }
  

  @Post()
  @HttpCode(201)
  async post(@Body() body: Profissional) {
    const profissional = ProfissionalSchema.parse(body);
    return await this.profissionalService.post(profissional);
  }

  @Put(':id')
  async put(@Param('id') id: string, @Body() body: Profissional) {
    UuidSchema.parse({ id });
    const profissional = ProfissionalSchema.partial().parse(body)
    return await this.profissionalService.put(id, profissional);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    UuidSchema.parse({id});
    return await this.profissionalService.delete(id)
  }
}
