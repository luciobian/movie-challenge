import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../shared/base.entity';
import { Actor } from './actor.entity';
import { Director } from './director.entity';
import { Gender } from './gender.entity';

@Entity({ name: 'movie' })
export class Movie extends BaseEntity {
  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  budget: number;

  @ManyToOne(() => Director, (director) => director.movies)
  @JoinColumn({ name: 'director_id' })
  director: Director;

  @ManyToOne(() => Gender, (gender) => gender.movies)
  @JoinColumn({ name: 'gender_id' })
  gender: Gender;

  @ManyToMany(() => Actor, (actor) => actor.movies)
  actors: Actor[];
}
