import { Director } from '../../src/features/movies/entities/director.entity';
import { DirectorRepositoryInterface } from '../../src/features/movies/repositories/director.repository.interface';
import { DirectorService } from '../../src/features/movies/services/director.service';
import { directorMock } from '../mocks/director';

describe('Tests Director Service', () => {
  it('Validate Director Id: Must call specific method and return false if id does not exists in the DB.', async () => {
    const invalidId: string = givenDirectorId();
    const directorMockRepository: DirectorRepositoryInterface = givenDirectorRepository(undefined);
    const response: Director = await whenValidateDirectorId(directorMockRepository, invalidId);
    thenServiceMustReturnUndefined(response, directorMockRepository);
  });
  it('Validate Director Id: Must call specific method and return true if id exists in the DB.', async () => {
    const validId: string = givenDirectorId();
    const directorMockRepository: DirectorRepositoryInterface = givenDirectorRepository(directorMock);
    const response: Director = await whenValidateDirectorId(directorMockRepository, validId);
    thenServiceMustReturnDirector(response, directorMockRepository);
  });
});

function givenDirectorId(): string {
  return 'director-1-mock-uuid';
}
function givenDirectorRepository(response: Director): DirectorRepositoryInterface {
  return {
    getAll: jest.fn(),
    getById: jest.fn().mockReturnValue(response),
  };
}
async function whenValidateDirectorId(
  directorMockRepository: DirectorRepositoryInterface,
  idMock: string,
): Promise<Director> {
  const directorService = new DirectorService(directorMockRepository);
  return await directorService.validateDirector(idMock);
}
function thenServiceMustReturnDirector(response: Director, directorMockRepository: DirectorRepositoryInterface): void {
  expect(directorMockRepository.getById).toBeCalled();
  expect(response).toBeTruthy();
}

function thenServiceMustReturnUndefined(response: Director, directorMockRepository: DirectorRepositoryInterface): void {
  expect(directorMockRepository.getById).toBeCalled();
  expect(response).not.toBeDefined();
}
