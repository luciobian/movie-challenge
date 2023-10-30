import { CanActivate, ExecutionContext, HttpException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { RolesEnum } from '../utils/roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<boolean>('PUBLIC', context.getHandler());
    if (isPublic) {
      return true;
    }

    const roles = this.reflector.get<Array<keyof typeof RolesEnum>>('ROLES', context.getHandler());

    const req = context.switchToHttp().getRequest<Request>();

    const roleUser = req['roleUser'];

    //no decorator
    if (roles === undefined) {
      return true;
    }

    const isAuth = roles.some(role => role === roleUser);
    // If the user does not have the role of the guard, throw an exception.
    if (!isAuth) {
      throw new HttpException('You do not have permissions for this operation', 403);
    }
    return true;
  }
}
