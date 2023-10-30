import { HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectionEnum } from '../../../shared/utils/injection.enum';
import { UserServiceInterface } from '../../users/services/user.service.interface';
import { PasswordEncryptorInterface } from '../../users/utils/password-encryptor.interface';
import { AuthResponseDto } from '../dto/auth-response.dto';
import { LoginRequestDto } from '../dto/login-request.dto';
import { AuthServiceInterface } from './auth.service.interface';
import { TokenManagerInterface } from './token-manager.interface';

@Injectable()
export class AuthService implements AuthServiceInterface {
  constructor(
    @Inject(InjectionEnum.USER_SERVICE) private readonly userService: UserServiceInterface,
    @Inject(InjectionEnum.PASSWORD_ENCRYPTOR) private readonly passwordEncryptor: PasswordEncryptorInterface,
    @Inject(InjectionEnum.TOKEN_MANAGER) private readonly tokenManager: TokenManagerInterface,
  ) {}
  async login(request: LoginRequestDto): Promise<AuthResponseDto> {
    try {
      const user = await this.userService.getUserByEmail(request.email);
      if (!user) {
        throw new HttpException('Email/password invalid.', 401);
      }
      const isValidPassword = await this.passwordEncryptor.comparePassword(request.password, user.password);
      if (!isValidPassword) {
        throw new HttpException('Email/password invalid.', 401);
      }
      const accessToken = await this.tokenManager.generateJWT(user);
      return { accessToken, user };
    } catch (error) {
      throw error;
    }
  }
}
