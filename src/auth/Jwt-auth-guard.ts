import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from 'src/utils/decorators/public';
const reflector = new Reflector()

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

    
  canActivate(context: ExecutionContext) {
    const isPublic = reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
      if (isPublic) {
        // 💡 See this condition
        return true;
      }

    return super.canActivate(context);
  }
}