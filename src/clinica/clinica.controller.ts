import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist/decorators';
import { Clinica } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/Jwt-auth-guard';
import { Public } from 'src/utils/decorators/public';
import { UuidSchema } from 'src/utils/uuid-type';
import { ClinicaSchema } from './clinica.interface';
import { ClinicaService } from './clinica.service';

@Controller('clinica')
@ApiTags("clinica")
export class ClinicaController {
  constructor(private clinicaService: ClinicaService) {}

  @Get()
  @Public()
  async getall() {
    return await this.clinicaService.getAll();
  }

  @Get(':id')
  
  async get(@Param('id') id: string) {
    UuidSchema.parse({ id });
    return await this.clinicaService.get(id);
  }

  @Post()
  @HttpCode(201)
  async post(@Body() body: Clinica) {
    const clinica = ClinicaSchema.parse(body);
    return await this.clinicaService.post(clinica);
  }

  @Put(':id')
  async put(@Param('id') id: string, @Body() body: Clinica) {
    UuidSchema.parse({ id });
    const clinica = ClinicaSchema.parse(body);
    return await this.clinicaService.put(id, clinica);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    UuidSchema.parse({ id });
    return this.clinicaService.delete(id);
  }
}
