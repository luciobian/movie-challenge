import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Director } from '../entities/director.entity';
import { DirectorRepositoryInterface } from './director.repository.interface';

@Injectable()
export class DirectorRepository implements DirectorRepositoryInterface {
  constructor(@InjectRepository(Director) private repository: Repository<Director>) {}
  async getAll(): Promise<Director[]> {
    return await this.repository.find({ where: { deletedAt: IsNull() } });
  }
  async getById(id: string): Promise<Director> {
    return await this.repository.findOne({ where: { id, deletedAt: IsNull() } });
  }
}
