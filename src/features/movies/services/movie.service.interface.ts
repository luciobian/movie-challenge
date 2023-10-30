import { CreateMovieDto } from '../dto/create-movie.dto';
import { UpdateMovieDto } from '../dto/update-movie.dto';
import { Movie } from '../entities/movie.entity';

export interface MovieServiceInterface {
  update(id: string, updateMovieDto: UpdateMovieDto): Promise<Movie>;
  delete(id: string): Promise<Movie>;
  getById(id: string): Promise<Movie>;
  getAll(): Promise<Movie[]>;
  create(movie: CreateMovieDto): Promise<Movie>;
}
