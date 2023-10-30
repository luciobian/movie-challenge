import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InjectionEnum } from '../../shared/utils/injection.enum';
import { RolesModule } from '../roles/roles.module';
import { User } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';
import { UserService } from './services/user.service';
import { PasswordEncryptor } from './utils/password-encryptor';

@Module({
  imports: [RolesModule, forwardRef(() => TypeOrmModule.forFeature([User]))],
  exports: [InjectionEnum.USER_SERVICE],
  providers: [
    {
      provide: InjectionEnum.USER_REPOSITORY,
      useClass: UserRepository,
    },
    {
      provide: InjectionEnum.USER_SERVICE,
      useClass: UserService,
    },
    {
      provide: InjectionEnum.PASSWORD_ENCRYPTOR,
      useClass: PasswordEncryptor,
    },
  ],
})
export class UsersModule {}
