import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist/decorators';
import {
  Cliente,
  ClienteBodySchema,
} from 'src/auth/cadastro/cliente.interface';
import { Public } from 'src/utils/decorators/public';
import { CadastroService } from './cadastro.service';

@Controller('cadastro')
@ApiTags("cadastro")
export class CadastroController {
  constructor(private cadastroService: CadastroService) {}

  @Post()
  @Public()
  @HttpCode(201)
  public async post(@Body() body: Cliente) {
    ClienteBodySchema.parse(body);
    return await this.cadastroService.post(body);
  }
}
