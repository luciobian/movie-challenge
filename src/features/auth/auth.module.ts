import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtSecret } from '../../config/data-source';
import { InjectionEnum } from '../../shared/utils/injection.enum';
import { RolesModule } from '../roles/roles.module';
import { User } from '../users/entities/user.entity';
import { UserRepository } from '../users/repositories/user.repository';
import { UserService } from '../users/services/user.service';
import { UsersModule } from '../users/users.module';
import { PasswordEncryptor } from '../users/utils/password-encryptor';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { TokenManage } from './services/token-manager';

@Module({
  imports: [
    UsersModule,
    RolesModule,
    JwtModule.register({ secret: jwtSecret }),
    forwardRef(() => TypeOrmModule.forFeature([User])),
  ],
  controllers: [AuthController],
  exports: [InjectionEnum.TOKEN_MANAGER],
  providers: [
    {
      provide: InjectionEnum.AUTH_SERVICE,
      useClass: AuthService,
    },
    {
      provide: InjectionEnum.USER_SERVICE,
      useClass: UserService,
    },
    {
      provide: InjectionEnum.PASSWORD_ENCRYPTOR,
      useClass: PasswordEncryptor,
    },
    {
      provide: InjectionEnum.USER_REPOSITORY,
      useClass: UserRepository,
    },
    {
      provide: InjectionEnum.TOKEN_MANAGER,
      useClass: TokenManage,
    },
  ],
})
export class AuthModule {}
