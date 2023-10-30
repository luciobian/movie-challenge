import { Inject, Injectable } from '@nestjs/common';
import { InjectionEnum } from '../../../shared/utils/injection.enum';
import { Actor } from '../entities/actor.entity';
import { ActorRepositoryInterface } from '../repositories/actor.repository.interface';
import { ActorServiceInterface } from './actor.service.interface';
@Injectable()
export class ActorService implements ActorServiceInterface {
  constructor(@Inject(InjectionEnum.ACTOR_REPOSITORY) private readonly actorRepository: ActorRepositoryInterface) {}
  async getAll(): Promise<Actor[]> {
    return await this.actorRepository.getAll();
  }

  async validateListOfActors(actorsIdList: string[]): Promise<Actor[]> {
    return await this.actorRepository.getListOfActors(actorsIdList);
  }
}
