import { Actor } from '../entities/actor.entity';

export interface ActorServiceInterface {
  getAll(): Promise<Actor[]>;
  validateListOfActors(actorsIdList: string[]): Promise<Actor[]>;
}
