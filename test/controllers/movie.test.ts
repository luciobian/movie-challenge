import { MovieController } from '../../src/features/movies/controllers/movie.controller';
import { CreateMovieDto } from '../../src/features/movies/dto/create-movie.dto';
import { MovieServiceInterface } from '../../src/features/movies/services/movie.service.interface';
import { validMockMovie } from '../mocks/movie';

describe('Tests Movie Controller', () => {
  it('Create Movie: Must call create method of movie service dto.', async () => {
    const createMovieDtoMock: CreateMovieDto = givenCreateMovieDto();
    const movieServiceMock: MovieServiceInterface = givenMovieService();

    await whenCreateMovie(movieServiceMock, createMovieDtoMock);

    thenMovieServiceMustBeCalled(movieServiceMock, createMovieDtoMock);
  });

  it('Get All Movies: Must call getAll method of movie service.', async () => {
    const movieServiceMock: MovieServiceInterface = givenMovieService();

    await whenGetAllMovies(movieServiceMock);

    thenGetAllMovieServiceMustBeCalled(movieServiceMock);
  });

  it('Get Movie by Id: Must call getById method of movie service with the movie id.', async () => {
    const movieServiceMock: MovieServiceInterface = givenMovieService();
    const movieIdMock = 'uuid-mock-movie-1';
    await whenGetMovieById(movieServiceMock, movieIdMock);

    thenGetMovieByIdMovieServiceMustBeCalled(movieServiceMock, movieIdMock);
  });
});
function thenMovieServiceMustBeCalled(
  movieServiceMock: MovieServiceInterface,
  createMovieDtoMock: CreateMovieDto,
): void {
  expect(movieServiceMock.create).toBeCalled();
  expect(movieServiceMock.create).toBeCalledWith(createMovieDtoMock);
}

async function whenCreateMovie(
  MovieServiceMock: MovieServiceInterface,
  createMovieDtoMock: CreateMovieDto,
): Promise<void> {
  const movieController = new MovieController(MovieServiceMock);
  await movieController.create(createMovieDtoMock);
}
function givenMovieService(): MovieServiceInterface {
  return {
    create: jest.fn(),
    getAll: jest.fn(),
    getById: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
  };
}

function givenCreateMovieDto(): CreateMovieDto {
  return validMockMovie;
}

async function whenGetAllMovies(movieServiceMock: MovieServiceInterface) {
  const movieController = new MovieController(movieServiceMock);
  await movieController.getAll();
}
function thenGetAllMovieServiceMustBeCalled(movieServiceMock: MovieServiceInterface) {
  expect(movieServiceMock.getAll).toBeCalled();
}

async function whenGetMovieById(movieServiceMock: MovieServiceInterface, movieId: string) {
  const movieController = new MovieController(movieServiceMock);
  await movieController.getById(movieId);
}

function thenGetMovieByIdMovieServiceMustBeCalled(movieServiceMock: MovieServiceInterface, movieId: string): void {
  expect(movieServiceMock.getById).toBeCalled();
  expect(movieServiceMock.getById).toBeCalledWith(movieId);
}
