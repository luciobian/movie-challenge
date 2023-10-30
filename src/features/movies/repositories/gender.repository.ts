import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Gender } from '../entities/gender.entity';
import { GenderRepositoryInterface } from './gender.repository.interface';

export class GenderRepository implements GenderRepositoryInterface {
  constructor(@InjectRepository(Gender) private repository: Repository<Gender>) {}
  async getAll(): Promise<Gender[]> {
    return await this.repository.find({ where: { deletedAt: IsNull() } });
  }
  async getById(id: string): Promise<Gender> {
    return await this.repository.findOne({ where: { id, deletedAt: IsNull() } });
  }
}
