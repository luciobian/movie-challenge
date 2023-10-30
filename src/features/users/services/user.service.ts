import { HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectionEnum } from '../../../shared/utils/injection.enum';
import { RegisterUserRequestDto } from '../dto/register-user-request.dto';
import { PasswordEncryptorInterface } from '../utils/password-encryptor.interface';
import { User } from '../entities/user.entity';
import { UserRepositoryInterface } from '../repositories/user.interface.repository';
import { UserServiceInterface } from './user.service.interface';
import { RoleServiceInterface } from '../../roles/services/role.service.interface';
import { RolesEnum } from '../../auth/utils/roles.enum';
import { Role } from '../../roles/entities/roles.entity';

@Injectable()
export class UserService implements UserServiceInterface {
  constructor(
    @Inject(InjectionEnum.PASSWORD_ENCRYPTOR)
    private readonly passwordEncryptor: PasswordEncryptorInterface,
    @Inject(InjectionEnum.USER_REPOSITORY)
    private readonly userRepository: UserRepositoryInterface,
    @Inject(InjectionEnum.ROLE_SERVICE)
    private readonly roleService: RoleServiceInterface,
  ) {}

  async register(request: RegisterUserRequestDto): Promise<User> {
    try {
      await this.validateUniqueEmail(request);
      const newPassword = await this.passwordEncryptor.encryptPassword(request.password);
      const role: Role = await this.roleService.getByName(RolesEnum.REGULAR_USER);
      return await this.userRepository.save(
        {
          ...request,
          password: newPassword,
        },
        role,
      );
    } catch (error) {
      throw error;
    }
  }

  async getUserByEmail(email: string): Promise<User> {
    return await this.userRepository.getByEmail(email);
  }

  async getUserById(id: string): Promise<User> {
    return await this.userRepository.getById(id);
  }

  private async validateUniqueEmail(request: RegisterUserRequestDto) {
    const user = await this.userRepository.getByEmail(request.email);
    if (user) {
      throw new HttpException('Email is already used.', 409);
    }
  }
}
