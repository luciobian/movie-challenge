import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsDefined, IsUUID } from 'class-validator';

export class CreateMovieDto {
  @ApiProperty({
    description: 'Title of the movie.',
    type: String,
    example: 'Movie Title',
  })
  @IsDefined()
  title: string;

  @ApiProperty({
    description: 'Description of the movie.',
    type: String,
    example: 'This is a movie description.',
  })
  @IsDefined()
  description: string;

  @ApiProperty({
    description: 'Array of actor UUIDs associated with the movie.',
    type: [String],
    example: ['actorId1', 'actorId2'],
  })
  @IsDefined()
  @IsArray()
  @ArrayMinSize(1)
  @IsUUID('4', { each: true })
  actorsId: string[];

  @ApiProperty({
    description: 'UUID of the director associated with the movie.',
    type: String,
    example: 'directorId',
  })
  @IsDefined()
  @IsUUID('4')
  directorId: string;

  @ApiProperty({
    description: 'UUID of the genre associated with the movie.',
    type: String,
    example: 'genreId',
  })
  @IsDefined()
  @IsUUID('4')
  genderId: string;

  @ApiProperty({
    description: 'Budget of the movie.',
    type: Number,
    example: 1_000_000,
  })
  @IsDefined()
  budget: number;
}
