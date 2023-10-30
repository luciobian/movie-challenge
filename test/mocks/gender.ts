import { Gender } from '../../src/features/movies/entities/gender.entity';
import { Movie } from '../../src/features/movies/entities/movie.entity';

export const genderMock: Gender = {
  name: 'Terror',
  movies: [] as Movie[],
  id: 'uuid-mock-gender-1',
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: undefined,
};
