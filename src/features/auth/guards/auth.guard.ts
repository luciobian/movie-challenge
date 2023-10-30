import { CanActivate, ExecutionContext, HttpException, Inject, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { InjectionEnum } from '../../../shared/utils/injection.enum';
import { UserServiceInterface } from '../../users/services/user.service.interface';
import { TokenManagerInterface } from '../services/token-manager.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(InjectionEnum.TOKEN_MANAGER) private readonly tokenManager: TokenManagerInterface,
    @Inject(InjectionEnum.USER_SERVICE) private readonly userService: UserServiceInterface,
    private readonly reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<boolean>('PUBLIC', context.getHandler());

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();

    const authHeader = request.headers['authorization'];
    const bearer = authHeader?.split(' ')[0];
    const token = authHeader?.split(' ')[1];

    if (bearer !== 'Bearer' || !token) {
      throw new HttpException('Authorization token is invalid.', 401);
    }

    const payload = this.tokenManager.getTokenPayload(token);

    if (!payload) {
      throw new HttpException('Authorization token is invalid.', 401);
    }

    if (payload.isExpired) {
      throw new HttpException('Authorization token is expired.', 401);
    }
    const user = await this.userService.getUserById(payload.sub);
    if (!user) {
      throw new HttpException('Invalid user.', 401);
    }
    request['idUser'] = user.id;
    request['roleUser'] = user.role.name;
    return true;
  }
}
