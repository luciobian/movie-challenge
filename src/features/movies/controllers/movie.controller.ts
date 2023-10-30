import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { InjectionEnum } from '../../../shared/utils/injection.enum';
import { Public } from '../../auth/decorators/public.decorator';
import { Roles } from '../../auth/decorators/roles.decorator';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { CreateMovieDto } from '../dto/create-movie.dto';
import { UpdateMovieDto } from '../dto/update-movie.dto';
import { Movie } from '../entities/movie.entity';
import { MovieServiceInterface } from '../services/movie.service.interface';

@ApiTags('Movies')
@Controller('movies')
@UseGuards(AuthGuard, RolesGuard)
export class MovieController {
  constructor(@Inject(InjectionEnum.MOVIE_SERVICE) private readonly movieService: MovieServiceInterface) {}

  @ApiOperation({ summary: 'Create a new movie.' })
  @ApiOkResponse({
    description: 'The movie record',
    type: Movie,
    isArray: false,
  })
  @Post()
  @ApiBearerAuth('Authorization')
  @Roles('ADMIN')
  async create(@Body() request: CreateMovieDto): Promise<Movie> {
    return await this.movieService.create(request);
  }

  @ApiOperation({ summary: 'Get all movies.' })
  @ApiOkResponse({
    description: 'List of movies',
    type: Movie,
    isArray: true,
  })
  @Public()
  @Get()
  async getAll(): Promise<Movie[]> {
    return await this.movieService.getAll();
  }

  @ApiOperation({ summary: 'Get specific movie.' })
  @ApiOkResponse({
    description: 'Detail of a movie',
    type: Movie,
    isArray: false,
  })
  @Roles('REGULAR_USER', 'ADMIN')
  @ApiBearerAuth('Authorization')
  @Get('/:id')
  async getById(@Param('id') id: string): Promise<Movie> {
    return await this.movieService.getById(id);
  }

  @ApiOperation({ summary: 'Delete specific movie.' })
  @ApiOkResponse({
    description: 'Deleted movie',
    type: Movie,
    isArray: false,
  })
  @Roles('ADMIN')
  @ApiBearerAuth('Authorization')
  @Delete('/:id')
  async deleteById(@Param('id') id: string): Promise<Movie> {
    return await this.movieService.delete(id);
  }

  @ApiOperation({ summary: 'Update specific movie.' })
  @ApiOkResponse({
    description: 'Updated movie',
    type: Movie,
    isArray: false,
  })
  @Roles('ADMIN')
  @ApiBearerAuth('Authorization')
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto): Promise<Movie> {
    return await this.movieService.update(id, updateMovieDto);
  }
}
