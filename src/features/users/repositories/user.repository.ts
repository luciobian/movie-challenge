import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Role } from '../../roles/entities/roles.entity';
import { RegisterUserRequestDto } from '../dto/register-user-request.dto';
import { User } from '../entities/user.entity';
import { UserRepositoryInterface } from './user.interface.repository';

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  constructor(@InjectRepository(User) private repository: Repository<User>) {}

  async save(user: RegisterUserRequestDto, role: Role): Promise<User> {
    const newUser = this.repository.create(user);
    const savedUser = await this.repository.save({ ...newUser, role });
    return savedUser;
  }
  async getByEmail(email: string): Promise<User> {
    return await this.repository.findOne({ where: { email, deletedAt: IsNull() }, relations: ['role'] });
  }

  async getById(id: string): Promise<User> {
    return await this.repository.findOne({ where: { id, deletedAt: IsNull() }, relations: ['role'] });
  }
}
