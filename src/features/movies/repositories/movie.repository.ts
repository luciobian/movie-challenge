import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { CreateMovieDto } from '../dto/create-movie.dto';
import { Movie } from '../entities/movie.entity';
import { MovieRelationsInterface } from '../utils/movie-relations.interface';
import { MovieRepositoryInterface } from './movie.repository.interface';

export class MovieRepository implements MovieRepositoryInterface {
  constructor(@InjectRepository(Movie) private repository: Repository<Movie>) {}
  async getAll(): Promise<Movie[]> {
    return await this.repository.find({ where: { deletedAt: IsNull() }, relations: ['actors', 'director', 'gender'] });
  }
  async create(movie: CreateMovieDto, relations: MovieRelationsInterface): Promise<Movie> {
    const newMovie = this.repository.create({
      ...movie,
      actors: relations.actors,
      director: relations.director,
      gender: relations.gender,
    });
    const savedMovie = await this.repository.save(newMovie);
    return savedMovie;
  }

  async getById(id: string): Promise<Movie> {
    return await this.repository.findOne({
      where: { deletedAt: IsNull(), id },
      relations: ['actors', 'director', 'gender'],
    });
  }

  async deleteById(id: string): Promise<Movie> {
    const movie = await this.getById(id);
    movie.deletedAt = new Date();
    await this.repository.save(movie);
    return movie;
  }

  async update(movie: Movie): Promise<Movie> {
    return await this.repository.save(movie);
  }
}
