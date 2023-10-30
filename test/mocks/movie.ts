import { CreateMovieDto } from '../../src/features/movies/dto/create-movie.dto';
import { Director } from '../../src/features/movies/entities/director.entity';
import { Gender } from '../../src/features/movies/entities/gender.entity';
import { Movie } from '../../src/features/movies/entities/movie.entity';

export const validMockMovie: CreateMovieDto = {
  actorsId: [
    'df298f6e-74f3-11ee-b962-0242ac120002',
    'faacca4e-74f3-11ee-b962-0242ac120002',
    '0242ac120002-74f3-b962-b962-0242ac120002',
  ],
  directorId: 'b962-74f3-11ee-df298f6e-0242ac120002',
  budget: 20_000_000,
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sit amet dignissim odio. Phasellus eu turpis vel sapien accumsan rutrum in sed nibh. Aenean sit amet metus justo. Morbi porttitor velit quis purus aliquam lobortis. Pellentesque maximus est ligula, sed varius lacus placerat ut. Duis in laoreet nisl. ',
  genderId: 'f21f076d-6d46-4b28-91df-64c3265908db',
  title: 'Movie Mock Title',
};

export const movieCreateResponse: Movie = {
  budget: 20_000_000,
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sit amet dignissim odio. Phasellus eu turpis vel sapien accumsan rutrum in sed nibh. Aenean sit amet metus justo. Morbi porttitor velit quis purus aliquam lobortis. Pellentesque maximus est ligula, sed varius lacus placerat ut. Duis in laoreet nisl. ',
  title: 'Movie Mock Title',
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: new Date(),
  director: new Director(),
  gender: new Gender(),
  actors: [],
  id: 'uuid-mock-generated',
};

export const movieArrayMock: Movie[] = [
  {
    budget: 20_000_000,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sit amet dignissim odio. Phasellus eu turpis vel sapien accumsan rutrum in sed nibh. Aenean sit amet metus justo. Morbi porttitor velit quis purus aliquam lobortis. Pellentesque maximus est ligula, sed varius lacus placerat ut. Duis in laoreet nisl. ',
    title: 'Movie Mock Title 1',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date(),
    director: new Director(),
    gender: new Gender(),
    actors: [],
    id: 'uuid1-mock-generated',
  },
  {
    budget: 20_000_000,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sit amet dignissim odio. Phasellus eu turpis vel sapien accumsan rutrum in sed nibh. Aenean sit amet metus justo. Morbi porttitor velit quis purus aliquam lobortis. Pellentesque maximus est ligula, sed varius lacus placerat ut. Duis in laoreet nisl. ',
    title: 'Movie Mock Title 2',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date(),
    director: new Director(),
    gender: new Gender(),
    actors: [],
    id: 'uuid2-mock-generated',
  },
  {
    budget: 20_000_000,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sit amet dignissim odio. Phasellus eu turpis vel sapien accumsan rutrum in sed nibh. Aenean sit amet metus justo. Morbi porttitor velit quis purus aliquam lobortis. Pellentesque maximus est ligula, sed varius lacus placerat ut. Duis in laoreet nisl. ',
    title: 'Movie Mock Title 3',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date(),
    director: new Director(),
    gender: new Gender(),
    actors: [],
    id: 'uuid3-mock-generated',
  },
];
