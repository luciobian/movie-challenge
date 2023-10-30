import { HttpException } from '@nestjs/common';
import { CreateMovieDto } from '../../src/features/movies/dto/create-movie.dto';
import { Actor } from '../../src/features/movies/entities/actor.entity';
import { Director } from '../../src/features/movies/entities/director.entity';
import { Gender } from '../../src/features/movies/entities/gender.entity';
import { Movie } from '../../src/features/movies/entities/movie.entity';
import { MovieRepositoryInterface } from '../../src/features/movies/repositories/movie.repository.interface';
import { ActorServiceInterface } from '../../src/features/movies/services/actor.service.interface';
import { DirectorServiceInterface } from '../../src/features/movies/services/director.service.interface';
import { GenderServiceInterface } from '../../src/features/movies/services/gender.service.interface';
import { MovieService } from '../../src/features/movies/services/movie.service';
import { arrayOfActorsMock } from '../mocks/actor';
import { directorMock } from '../mocks/director';
import { genderMock } from '../mocks/gender';
import { movieArrayMock, movieCreateResponse, validMockMovie } from '../mocks/movie';

describe('Tests Movie Service', () => {
  it('Create Movie: Must return 404 HTTP error if list actors does not exists in the DB.', async () => {
    const createMovieDtoMock: CreateMovieDto = givenCreateMovieDto();
    const movieRespositoryMock: MovieRepositoryInterface = givenMovieRepositoryCreate(movieCreateResponse);
    const actorServiceMock: ActorServiceInterface = givenActorService([]);
    const genderServiceMock: GenderServiceInterface = givenGenderService(genderMock);
    const directorServiceMock: DirectorServiceInterface = givenDirectorService(directorMock);

    let errorExpected: Error;
    try {
      await whenCreateMovie(
        movieRespositoryMock,
        genderServiceMock,
        directorServiceMock,
        actorServiceMock,
        createMovieDtoMock,
      );
    } catch (error) {
      errorExpected = error;
    }
    thenLoginUserMustThrowActorNotFoundHTTPError(errorExpected, createMovieDtoMock, actorServiceMock);
  });
  it('Create Movie: Must return 404 HTTP error if gender id does not exists in the DB.', async () => {
    const createMovieDtoMock: CreateMovieDto = givenCreateMovieDto();
    const movieRespositoryMock: MovieRepositoryInterface = givenMovieRepositoryCreate(movieCreateResponse);
    const actorServiceMock: ActorServiceInterface = givenActorService(arrayOfActorsMock);
    const genderServiceMock: GenderServiceInterface = givenGenderService(undefined);
    const directorServiceMock: DirectorServiceInterface = givenDirectorService(directorMock);

    let errorExpected: Error;
    try {
      await whenCreateMovie(
        movieRespositoryMock,
        genderServiceMock,
        directorServiceMock,
        actorServiceMock,
        createMovieDtoMock,
      );
    } catch (error) {
      errorExpected = error;
    }
    thenLoginUserMustThrowGenderNotFoundHTTPError(errorExpected, createMovieDtoMock, genderServiceMock);
  });
  it('Create Movie: Must return 404 HTTP error if director id does not exists in the DB.', async () => {
    const createMovieDtoMock: CreateMovieDto = givenCreateMovieDto();
    const movieRespositoryMock: MovieRepositoryInterface = givenMovieRepositoryCreate(movieCreateResponse);
    const actorServiceMock: ActorServiceInterface = givenActorService(arrayOfActorsMock);
    const genderServiceMock: GenderServiceInterface = givenGenderService(genderMock);
    const directorServiceMock: DirectorServiceInterface = givenDirectorService(undefined);

    let errorExpected: Error;
    try {
      await whenCreateMovie(
        movieRespositoryMock,
        genderServiceMock,
        directorServiceMock,
        actorServiceMock,
        createMovieDtoMock,
      );
    } catch (error) {
      errorExpected = error;
    }
    thenLoginUserMustThrowDirectorNotFoundHTTPError(errorExpected, createMovieDtoMock, directorServiceMock);
  });
  it('Create Movie: Must return a specific response.', async () => {
    const createMovieDtoMock: CreateMovieDto = givenCreateMovieDto();
    const movieRespositoryMock: MovieRepositoryInterface = givenMovieRepositoryCreate(movieCreateResponse);
    const actorServiceMock: ActorServiceInterface = givenActorService(arrayOfActorsMock);
    const genderServiceMock: GenderServiceInterface = givenGenderService(genderMock);
    const directorServiceMock: DirectorServiceInterface = givenDirectorService(directorMock);
    const expectedResponse = await whenCreateMovie(
      movieRespositoryMock,
      genderServiceMock,
      directorServiceMock,
      actorServiceMock,
      createMovieDtoMock,
    );
    thenRegisterMustReturnAnSpecificResponse(expectedResponse, movieRespositoryMock, createMovieDtoMock);
  });

  it('Get All Movies: Must return a empty array if there are not movies in the DB.', async () => {
    const movieRespositoryMock: MovieRepositoryInterface = givenMovieRepositoryGetAll([]);
    const actorServiceMock: ActorServiceInterface = givenActorService(arrayOfActorsMock);
    const genderServiceMock: GenderServiceInterface = givenGenderService(genderMock);
    const directorServiceMock: DirectorServiceInterface = givenDirectorService(directorMock);
    const expectedResponse = await whenGetAllMovies(
      movieRespositoryMock,
      genderServiceMock,
      directorServiceMock,
      actorServiceMock,
    );
    thenRegisterMustReturnAnEmptyArray(expectedResponse, movieRespositoryMock);
  });

  it('Get All Movies: Must return a array of movies if there are movies in the DB.', async () => {
    const movieRespositoryMock: MovieRepositoryInterface = givenMovieRepositoryGetAll(movieArrayMock);
    const actorServiceMock: ActorServiceInterface = givenActorService(arrayOfActorsMock);
    const genderServiceMock: GenderServiceInterface = givenGenderService(genderMock);
    const directorServiceMock: DirectorServiceInterface = givenDirectorService(directorMock);
    const expectedResponse = await whenGetAllMovies(
      movieRespositoryMock,
      genderServiceMock,
      directorServiceMock,
      actorServiceMock,
    );
    thenRegisterMustReturnAnArrayOfMovies(expectedResponse, movieRespositoryMock);
  });

  it('Get Movie By Id: Must throw an Not Found Http exception if movie does not exists in the DB.', async () => {
    const movieIdMock = 'uuid-mock-movie-1';
    const movieRespositoryMock: MovieRepositoryInterface = givenMovieRepositoryGetById(undefined);
    const actorServiceMock: ActorServiceInterface = givenActorService(arrayOfActorsMock);
    const genderServiceMock: GenderServiceInterface = givenGenderService(genderMock);
    const directorServiceMock: DirectorServiceInterface = givenDirectorService(directorMock);
    let expectedError: Error;
    try {
      await whenGetMovieById(
        movieIdMock,
        movieRespositoryMock,
        genderServiceMock,
        directorServiceMock,
        actorServiceMock,
      );
    } catch (error) {
      expectedError = error;
    }
    thenMustThrowNotFoundException(expectedError, movieRespositoryMock, movieIdMock);
  });

  it('Get Movie By Id: Must return the movie if the movie exists in the DB.', async () => {
    const movieIdMock = 'uuid-mock-movie-1';
    const movieRespositoryMock: MovieRepositoryInterface = givenMovieRepositoryGetById(movieCreateResponse);
    const actorServiceMock: ActorServiceInterface = givenActorService(arrayOfActorsMock);
    const genderServiceMock: GenderServiceInterface = givenGenderService(genderMock);
    const directorServiceMock: DirectorServiceInterface = givenDirectorService(directorMock);
    const expectedResponse = await whenGetMovieById(
      movieIdMock,
      movieRespositoryMock,
      genderServiceMock,
      directorServiceMock,
      actorServiceMock,
    );
    thenMustReturnMovie(expectedResponse, movieRespositoryMock);
  });
});

async function whenCreateMovie(
  movieRespositoryMock: MovieRepositoryInterface,
  genderServiceMock: GenderServiceInterface,
  directorServiceMock: DirectorServiceInterface,
  actorServiceMock: ActorServiceInterface,
  createMovieDtoMock: CreateMovieDto,
): Promise<Movie> {
  const movieService = new MovieService(movieRespositoryMock, actorServiceMock, genderServiceMock, directorServiceMock);
  return await movieService.create(createMovieDtoMock);
}

async function whenGetMovieById(
  mockId: string,
  movieRespositoryMock: MovieRepositoryInterface,
  genderServiceMock: GenderServiceInterface,
  directorServiceMock: DirectorServiceInterface,
  actorServiceMock: ActorServiceInterface,
): Promise<Movie> {
  const movieService = new MovieService(movieRespositoryMock, actorServiceMock, genderServiceMock, directorServiceMock);
  return await movieService.getById(mockId);
}

function givenCreateMovieDto(): CreateMovieDto {
  return validMockMovie;
}
function givenMovieRepositoryCreate(response: Movie): MovieRepositoryInterface {
  return {
    create: jest.fn().mockReturnValue(response),
    getAll: jest.fn(),
    getById: jest.fn(),
    deleteById: jest.fn(),
    update: jest.fn(),
  };
}

function givenMovieRepositoryGetAll(response: Movie[]): MovieRepositoryInterface {
  return {
    create: jest.fn(),
    getAll: jest.fn().mockReturnValue(response),
    getById: jest.fn(),
    deleteById: jest.fn(),
    update: jest.fn(),
  };
}

function givenMovieRepositoryGetById(response: Movie): MovieRepositoryInterface {
  return {
    create: jest.fn(),
    getAll: jest.fn(),
    getById: jest.fn().mockReturnValue(response),
    update: jest.fn(),
    deleteById: jest.fn(),
  };
}

function givenActorService(validateListOfActorsResponse: Actor[]): ActorServiceInterface {
  return {
    validateListOfActors: jest.fn().mockReturnValue(validateListOfActorsResponse),
    getAll: jest.fn(),
  };
}

function givenGenderService(validateGenderResponse: Gender): GenderServiceInterface {
  return {
    validateGender: jest.fn().mockReturnValue(validateGenderResponse),
    getAll: jest.fn(),
  };
}
function givenDirectorService(validateDirectorResponse: Director): DirectorServiceInterface {
  return {
    validateDirector: jest.fn().mockReturnValue(validateDirectorResponse),
    getAll: jest.fn(),
  };
}
function thenLoginUserMustThrowActorNotFoundHTTPError(
  errorExpected: Error,
  dto: CreateMovieDto,
  service: ActorServiceInterface,
): void {
  expect(service.validateListOfActors).toBeCalled();
  expect(service.validateListOfActors).toBeCalledWith(dto.actorsId);
  expect(errorExpected).toEqual(new HttpException('Actor not found.', 404));
}

function thenLoginUserMustThrowDirectorNotFoundHTTPError(
  errorExpected: Error,
  dto: CreateMovieDto,
  service: DirectorServiceInterface,
): void {
  expect(service.validateDirector).toBeCalled();
  expect(service.validateDirector).toBeCalledWith(dto.directorId);
  expect(errorExpected).toEqual(new HttpException('Director not found.', 404));
}

function thenLoginUserMustThrowGenderNotFoundHTTPError(
  errorExpected: Error,
  dto: CreateMovieDto,
  service: GenderServiceInterface,
): void {
  expect(service.validateGender).toBeCalled();
  expect(service.validateGender).toBeCalledWith(dto.genderId);
  expect(errorExpected).toEqual(new HttpException('Gender not found.', 404));
}
function thenRegisterMustReturnAnSpecificResponse(
  expectedResponse: Movie,
  movieRespositoryMock: MovieRepositoryInterface,
  createMovieDtoMock: CreateMovieDto,
): void {
  expect(movieRespositoryMock.create).toBeCalled();
  expect(expectedResponse.title).toBe(createMovieDtoMock.title);
  expect(expectedResponse.id).toBe('uuid-mock-generated');
}
async function whenGetAllMovies(
  movieRespositoryMock: MovieRepositoryInterface,
  genderServiceMock: GenderServiceInterface,
  directorServiceMock: DirectorServiceInterface,
  actorServiceMock: ActorServiceInterface,
): Promise<Movie[]> {
  const movieService = new MovieService(movieRespositoryMock, actorServiceMock, genderServiceMock, directorServiceMock);
  return await movieService.getAll();
}
function thenRegisterMustReturnAnEmptyArray(expectedResponse: Movie[], movieRespositoryMock: MovieRepositoryInterface) {
  expect(movieRespositoryMock.getAll).toBeCalled();
  expect(expectedResponse).toEqual([]);
}

function thenRegisterMustReturnAnArrayOfMovies(
  response: Movie[],
  movieRespositoryMock: MovieRepositoryInterface,
): void {
  expect(movieRespositoryMock.getAll).toBeCalled();
  expect(response.length).toBe(3);
}
function thenMustThrowNotFoundException(
  expectedError: Error,
  movieRespositoryMock: MovieRepositoryInterface,
  movieId: string,
) {
  expect(movieRespositoryMock.getById).toBeCalled();
  expect(movieRespositoryMock.getById).toBeCalledWith(movieId);
  expect(expectedError).toEqual(new HttpException('Movie not found.', 404));
}

function thenMustReturnMovie(response: Movie, RepositoryMock: MovieRepositoryInterface): void {
  expect(RepositoryMock.getById).toBeCalled();
  expect(response.id).toBe(movieCreateResponse.id);
}
