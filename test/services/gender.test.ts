import { Gender } from '../../src/features/movies/entities/gender.entity';
import { GenderRepositoryInterface } from '../../src/features/movies/repositories/gender.repository.interface';
import { GenderService } from '../../src/features/movies/services/gender.service';
import { genderMock } from '../mocks/gender';

describe('Tests Gender Service', () => {
  it('Validate Gender Id: Must call specific method and return false if id does not exists in the DB.', async () => {
    const invalidId: string = givenGenderId();
    const genderMockRepository: GenderRepositoryInterface = givenGenderRepository(undefined);
    const response: Gender = await whenValidateGenderId(genderMockRepository, invalidId);
    thenServiceMustReturnUndefined(response, genderMockRepository);
  });
  it('Validate Gender Id: Must call specific method and return true if id exists in the DB.', async () => {
    const validId: string = givenGenderId();
    const genderMockRepository: GenderRepositoryInterface = givenGenderRepository(genderMock);
    const response: Gender = await whenValidateGenderId(genderMockRepository, validId);
    thenServiceMustReturnGender(response, genderMockRepository);
  });
});

function givenGenderId(): string {
  return 'gender-1-mock-uuid';
}
function givenGenderRepository(response: Gender): GenderRepositoryInterface {
  return {
    getAll: jest.fn(),
    getById: jest.fn().mockReturnValue(response),
  };
}
async function whenValidateGenderId(genderMockRepository: GenderRepositoryInterface, idMock: string): Promise<Gender> {
  const genderService = new GenderService(genderMockRepository);
  return await genderService.validateGender(idMock);
}
function thenServiceMustReturnGender(response: Gender, genderMockRepository: GenderRepositoryInterface): void {
  expect(genderMockRepository.getById).toBeCalled();
  expect(response).toBeTruthy();
}

function thenServiceMustReturnUndefined(response: Gender, genderMockRepository: GenderRepositoryInterface): void {
  expect(genderMockRepository.getById).toBeCalled();
  expect(response).not.toBeDefined();
}
