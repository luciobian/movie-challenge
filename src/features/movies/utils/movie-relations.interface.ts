import { Actor } from '../entities/actor.entity';
import { Director } from '../entities/director.entity';
import { Gender } from '../entities/gender.entity';

export interface MovieRelationsInterface {
  actors: Actor[];
  director: Director;
  gender: Gender;
}
