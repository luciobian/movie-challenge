import { User } from '../../users/entities/user.entity';
import { JWTSingInterface, PayloadTokenInterface } from '../utils/jwt-sing.interface';

export interface TokenManagerInterface {
  generateJWT(user: User): Promise<string>;
  signJWT({ payload, expires }: JWTSingInterface): string;
  getTokenPayload(token: string): PayloadTokenInterface | false;
}
