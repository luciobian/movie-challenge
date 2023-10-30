import { Director } from '../../src/features/movies/entities/director.entity';
import { Movie } from '../../src/features/movies/entities/movie.entity';

export const directorMock: Director = {
  name: 'Francis Ford Coppola',
  movies: [] as Movie[],
  id: 'director-mock-uuid-1',
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: undefined,
};
