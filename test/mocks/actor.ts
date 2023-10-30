import { Actor } from '../../src/features/movies/entities/actor.entity';
import { Movie } from '../../src/features/movies/entities/movie.entity';

export const actorValidMock1: Actor = {
  id: 'uuid1',
  createdAt: new Date(),
  updatedAt: new Date(),
  name: 'Ron Johnson',
  movies: [] as Movie[],
  deletedAt: undefined,
};
export const actorValidMock2: Actor = {
  id: 'uuid2',
  createdAt: new Date(),
  updatedAt: new Date(),
  name: 'John Johnson',
  movies: [] as Movie[],
  deletedAt: undefined,
};
export const actorValidMock3: Actor = {
  id: 'uuid3',
  createdAt: new Date(),
  updatedAt: new Date(),
  name: 'Bob Johnson',
  movies: [] as Movie[],
  deletedAt: undefined,
};

export const arrayOfActorsMock: Actor[] = [actorValidMock1, actorValidMock2, actorValidMock3];
