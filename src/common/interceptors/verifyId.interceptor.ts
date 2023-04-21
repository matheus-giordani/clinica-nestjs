import { CallHandler, ExecutionContext, HttpException, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';
import { PrismaClient } from '@prisma/client';
import { from, Observable, throwError } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

const prisma = new PrismaClient()

@Injectable()
export class VerifyIdInterceptor implements NestInterceptor {
  private httpAdapter: AbstractHttpAdapter;
  constructor(adapterHost: HttpAdapterHost) {
    this.httpAdapter = adapterHost.httpAdapter;
  }
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse()
    const id = request.params.id;
    console.log(request.headers)
    if (!id) {
      return next.handle();
    }

    return from(this.searchid(id)).pipe(
      switchMap((idExist) => {
        if (idExist) {
          return next.handle();
        } else {
          const errorResponse = {
            message: { cause: 'id not Found' },
            httpStatus: HttpStatus.NOT_FOUND,
          };
          return throwError(() => new HttpException(errorResponse, HttpStatus.NOT_FOUND));
        }
      }),
    ); 

    
  }


  async searchid(id: string){
    const searchs = await prisma.$transaction([
      prisma.cliente.findUnique({where:{id}}),
      prisma.clinica.findUnique({where:{id}}),
      prisma.atendimento.findUnique({where:{id}}),
      prisma.profissional.findUnique({where:{id}}),
      prisma.servico.findUnique({where:{id}}),
      prisma.itensDeServico.findUnique({where:{id}})
  
    ])
    for (let index = 0; index < searchs.length; index++) {
      if(searchs[index] !== null){
        return true
      }
      
    }
    return false
  }
}
