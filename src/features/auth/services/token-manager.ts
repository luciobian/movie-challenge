import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../users/entities/user.entity';
import { JWTPayloadDecode, JWTSingInterface, PayloadTokenInterface } from '../utils/jwt-sing.interface';
import { TokenManagerInterface } from './token-manager.interface';

@Injectable()
export class TokenManage implements TokenManagerInterface {
  constructor(private readonly jwtService: JwtService) {}
  signJWT({ payload, expires }: JWTSingInterface): string {
    return this.jwtService.sign(payload, { expiresIn: expires });
  }

  async generateJWT(user: User): Promise<string> {
    const payload = {
      role: user.role.name,
      sub: user.id,
    };
    const jwtSingObj = {
      payload,
      expires: '1h',
    };
    return this.signJWT(jwtSingObj);
  }

  getTokenPayload(token: string): PayloadTokenInterface | false {
    try {
      const payload = this.jwtService.decode(token) as JWTPayloadDecode;

      const isExpired = payload.exp && Date.now() >= payload.exp * 1000;

      return {
        isExpired,
        role: payload.role,
        sub: payload.sub,
      };
    } catch (error) {
      return false;
    }
  }
}
