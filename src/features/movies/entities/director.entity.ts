import { Column, Entity, ManyToMany } from 'typeorm';
import { BaseEntity } from '../../../shared/base.entity';
import { Movie } from './movie.entity';

@Entity({ name: 'director' })
export class Director extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;

  @ManyToMany(() => Movie, (movie) => movie.actors)
  movies: Movie[];
}
