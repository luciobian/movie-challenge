import { Inject, Injectable } from '@nestjs/common';
import { InjectionEnum } from '../../../shared/utils/injection.enum';
import { Gender } from '../entities/gender.entity';
import { GenderRepositoryInterface } from '../repositories/gender.repository.interface';
import { GenderServiceInterface } from './gender.service.interface';

@Injectable()
export class GenderService implements GenderServiceInterface {
  constructor(@Inject(InjectionEnum.GENDER_REPOSITORY) private readonly genderRepository: GenderRepositoryInterface) {}
  async getAll(): Promise<Gender[]> {
    return await this.genderRepository.getAll();
  }
  async validateGender(genderId: string): Promise<Gender> {
    return await this.genderRepository.getById(genderId);
  }
}
