import { Inject, Injectable } from '@nestjs/common';
import { InjectionEnum } from '../../../shared/utils/injection.enum';
import { Director } from '../entities/director.entity';
import { DirectorRepositoryInterface } from '../repositories/director.repository.interface';
import { DirectorServiceInterface } from './director.service.interface';
@Injectable()
export class DirectorService implements DirectorServiceInterface {
  constructor(
    @Inject(InjectionEnum.DIRECTOR_REPOSITORY) private readonly directorRepository: DirectorRepositoryInterface,
  ) {}
  async getAll(): Promise<Director[]> {
    return this.directorRepository.getAll();
  }
  async validateDirector(directorId: string): Promise<Director> {
    return await this.directorRepository.getById(directorId);
  }
}
