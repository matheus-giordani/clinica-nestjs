import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist/decorators';
import { UuidSchema } from 'src/utils/uuid-type';
import { Servico, ServicoSchema } from './servico.interface';
import { ServicoService } from './servico.service';

@Controller('servico')
@ApiTags("serviço")
export class ServicoController {
    constructor(private servicoService: ServicoService){}

    @Get()
    async getAll(){
        return await this.servicoService.getAll()
    }

    @Get(':id')
    async get(@Param('id') id: string){
        UuidSchema.parse({id})
        return await this.servicoService.get(id)
    }

    @Post()
    @HttpCode(201)
    async post(@Body() body: Servico ){
        const servico = ServicoSchema.parse(body)
        return await this.servicoService.post(servico)
    }

    @Put(':id')
    async put(@Param('id') id: string, @Body() body: Servico){
            UuidSchema.parse({id})
            const servico = ServicoSchema.partial().parse(body)
            return await this.servicoService.put(id, servico)

    }

    @Delete(':id')
    async delete(@Param('id') id: string){
        UuidSchema.parse({id})
        return await this.servicoService.delete(id)

    }
}
