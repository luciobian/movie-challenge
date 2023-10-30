import { CreateMovieDto } from '../dto/create-movie.dto';
import { Movie } from '../entities/movie.entity';
import { MovieRelationsInterface } from '../utils/movie-relations.interface';

export interface MovieRepositoryInterface {
  update(movie: Movie): Promise<Movie>;
  deleteById(id: string): Promise<Movie>;
  getAll(): Promise<Movie[]>;
  create(movie: CreateMovieDto, relations: MovieRelationsInterface): Promise<Movie>;
  getById(id: string): Promise<Movie>;
}
