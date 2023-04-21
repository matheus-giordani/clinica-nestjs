import { PrismaClient } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ServicoService {


    constructor(private prisma: PrismaClient){}

    getAll(){
        return this.prisma.servico.findMany()
    }

    get(id: string){
        return this.prisma.servico.findUnique({
            where:{id}
        })
    }

    post(servico){
        return this.prisma.servico.create({
            data: servico
        })

    }

    put(id:string, servico){
        return this.prisma.servico.update({
            where: {id},
            data: servico
        })
    }

    delete(id: string){
        return this.prisma.servico.delete({
            where: {id}
        })
    }




}
