import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { BaseEntity } from '../../../shared/base.entity';
import { Movie } from './movie.entity';

@Entity({ name: 'actor' })
export class Actor extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;

  @ManyToMany(() => Movie, (movie) => movie.actors)
  @JoinTable({
    name: 'movie_actor',
    joinColumn: {
      name: 'actor',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'movie',
      referencedColumnName: 'id',
    },
  })
  movies: Movie[];
}
