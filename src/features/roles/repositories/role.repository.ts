import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Role } from '../entities/roles.entity';
import { RoleRepositoryInterface } from './role.repository.interface';

@Injectable()
export class RoleRepository implements RoleRepositoryInterface {
  constructor(@InjectRepository(Role) private readonly repository: Repository<Role>) {}
  async getByName(name: string): Promise<Role> {
    return await this.repository.findOne({ where: { name, deletedAt: IsNull() } });
  }
}
