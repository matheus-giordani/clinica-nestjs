import { HttpException, HttpStatus } from '@nestjs/common';

export class ApiError extends HttpException {
 public message;
  constructor(mensagem: string, httpStatus: HttpStatus) {
    const msg = {
      message: { cause: mensagem },
      httpStatus: httpStatus,
    };
    
    super(msg, httpStatus);
    this.message = msg
  }
}
