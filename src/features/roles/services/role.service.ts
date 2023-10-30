import { HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectionEnum } from '../../../shared/utils/injection.enum';
import { Role } from '../entities/roles.entity';
import { RoleServiceInterface } from './role.service.interface';

@Injectable()
export class RoleService implements RoleServiceInterface {
  constructor(@Inject(InjectionEnum.ROLE_REPOSITORY) private readonly roleRepository: RoleServiceInterface) {}

  async getByName(name: string): Promise<Role> {
    try {
      const role = await this.roleRepository.getByName(name);
      if (!role) {
        throw new HttpException('Role not found.', 404);
      }
      return role;
    } catch (error) {
      throw error;
    }
  }
}
