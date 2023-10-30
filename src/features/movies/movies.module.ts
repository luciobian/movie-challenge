import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InjectionEnum } from '../../shared/utils/injection.enum';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { ActorController } from './controllers/actor.controller';
import { DirectorController } from './controllers/director.controller';
import { GenderController } from './controllers/gender.controller';
import { MovieController } from './controllers/movie.controller';
import { Actor } from './entities/actor.entity';
import { Director } from './entities/director.entity';
import { Gender } from './entities/gender.entity';
import { Movie } from './entities/movie.entity';
import { ActorRepository } from './repositories/actor.repository';
import { DirectorRepository } from './repositories/director.repository';
import { GenderRepository } from './repositories/gender.repository';
import { MovieRepository } from './repositories/movie.repository';
import { ActorService } from './services/actor.service';
import { DirectorService } from './services/director.service';
import { GenderService } from './services/gender.service';
import { MovieService } from './services/movie.service';

@Module({
  imports: [AuthModule, UsersModule, forwardRef(() => TypeOrmModule.forFeature([Movie, Actor, Gender, Director]))],
  controllers: [MovieController, ActorController, GenderController, DirectorController],
  providers: [
    {
      provide: InjectionEnum.MOVIE_REPOSITORY,
      useClass: MovieRepository,
    },
    {
      provide: InjectionEnum.MOVIE_SERVICE,
      useClass: MovieService,
    },
    {
      provide: InjectionEnum.ACTOR_SERVICE,
      useClass: ActorService,
    },
    {
      provide: InjectionEnum.GENDER_SERVICE,
      useClass: GenderService,
    },
    {
      provide: InjectionEnum.DIRECTOR_SERVICE,
      useClass: DirectorService,
    },
    {
      provide: InjectionEnum.ACTOR_REPOSITORY,
      useClass: ActorRepository,
    },
    {
      provide: InjectionEnum.GENDER_REPOSITORY,
      useClass: GenderRepository,
    },
    {
      provide: InjectionEnum.DIRECTOR_REPOSITORY,
      useClass: DirectorRepository,
    },
  ],
})
export class MoviesModule {}
