import { HttpException, Inject } from '@nestjs/common';
import { InjectionEnum } from '../../../shared/utils/injection.enum';
import { CreateMovieDto } from '../dto/create-movie.dto';
import { UpdateMovieDto } from '../dto/update-movie.dto';
import { Movie } from '../entities/movie.entity';
import { MovieRepositoryInterface } from '../repositories/movie.repository.interface';
import { MovieRelationsInterface } from '../utils/movie-relations.interface';
import { ActorServiceInterface } from './actor.service.interface';
import { DirectorServiceInterface } from './director.service.interface';
import { GenderServiceInterface } from './gender.service.interface';
import { MovieServiceInterface } from './movie.service.interface';

export class MovieService implements MovieServiceInterface {
  constructor(
    @Inject(InjectionEnum.MOVIE_REPOSITORY) private readonly movieRepository: MovieRepositoryInterface,
    @Inject(InjectionEnum.ACTOR_SERVICE) private readonly actorService: ActorServiceInterface,
    @Inject(InjectionEnum.GENDER_SERVICE) private readonly genderService: GenderServiceInterface,
    @Inject(InjectionEnum.DIRECTOR_SERVICE) private readonly directorService: DirectorServiceInterface,
  ) {}
  async update(id: string, updateMovieDto: UpdateMovieDto): Promise<Movie> {
    const movie = await this.movieRepository.getById(id);

    if (!movie) {
      throw new HttpException('Movie not found', 404);
    }

    if (updateMovieDto.title) {
      movie.title = updateMovieDto.title;
    }
    if (updateMovieDto.description) {
      movie.description = updateMovieDto.description;
    }
    if (updateMovieDto.budget) {
      movie.budget = updateMovieDto.budget;
    }

    return await this.movieRepository.update(movie);
  }
  async delete(id: string): Promise<Movie> {
    return await this.movieRepository.deleteById(id);
  }

  async create(movie: CreateMovieDto): Promise<Movie> {
    try {
      const relations = await this.validateValuesExistenceInDB(movie);
      return await this.movieRepository.create(movie, relations);
    } catch (error) {
      throw error;
    }
  }

  async getAll(): Promise<Movie[]> {
    return await this.movieRepository.getAll();
  }

  async getById(id: string): Promise<Movie> {
    try {
      const movie = await this.movieRepository.getById(id);
      if (!movie) {
        throw new HttpException('Movie not found.', 404);
      }
      return movie;
    } catch (error) {
      throw error;
    }
  }

  async validateValuesExistenceInDB(movie: CreateMovieDto): Promise<MovieRelationsInterface> {
    const isValidListOfActors = await this.actorService.validateListOfActors(movie.actorsId);
    if (!isValidListOfActors.length) {
      throw new HttpException('Actor not found.', 404);
    }
    const isValidDirector = await this.directorService.validateDirector(movie.directorId);
    if (!isValidDirector) {
      throw new HttpException('Director not found.', 404);
    }
    const isValidGender = await this.genderService.validateGender(movie.genderId);
    if (!isValidGender) {
      throw new HttpException('Gender not found.', 404);
    }

    return { actors: isValidListOfActors, director: isValidDirector, gender: isValidGender };
  }
}
