import { Controller } from '@nestjs/common';
import { Body, Post } from '@nestjs/common/decorators';
import { ApiTags } from '@nestjs/swagger/dist/decorators';
import { Cliente, ClienteBodySchema } from '../cadastro/cliente.interface';
import { AuthService } from './auth.service';

@Controller('login')
@ApiTags("Auth")
export class AuthController {
  constructor(private loginService: AuthService) {}
  @Post()
  async login(@Body() body: Cliente) {
    const login = ClienteBodySchema.parse(body);
    return await this.loginService.getCliente(login);
  }
}
