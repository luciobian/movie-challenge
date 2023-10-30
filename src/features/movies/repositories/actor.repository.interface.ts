import { Actor } from '../entities/actor.entity';

export interface ActorRepositoryInterface {
  getAll(): Promise<Actor[]>;
  getListOfActors(listOfActorsId: string[]): Promise<Actor[]>;
}
