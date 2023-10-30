import { Module } from '@nestjs/common';
import { AuthModule } from './features/auth/auth.module';
import { UsersModule } from './features/users/users.module';
import { MoviesModule } from './features/movies/movies.module';
import { RolesModule } from './features/roles/roles.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSource } from './config/data-source';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `./.env`,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({ ...dataSource }),
    AuthModule,
    UsersModule,
    MoviesModule,
    RolesModule,
    SharedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
