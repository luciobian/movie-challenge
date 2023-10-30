import { InjectRepository } from '@nestjs/typeorm';
import { In, IsNull, Repository } from 'typeorm';
import { Actor } from '../entities/actor.entity';
import { ActorRepositoryInterface } from './actor.repository.interface';

export class ActorRepository implements ActorRepositoryInterface {
  constructor(@InjectRepository(Actor) private repository: Repository<Actor>) {}
  async getAll(): Promise<Actor[]> {
    return await this.repository.find({ where: { deletedAt: IsNull() } });
  }
  async getListOfActors(listOfActorsId: string[]): Promise<Actor[]> {
    return await this.repository.find({ where: { id: In(listOfActorsId), deletedAt: IsNull() } });
  }
}
