import { Actor } from '../../src/features/movies/entities/actor.entity';
import { ActorRepositoryInterface } from '../../src/features/movies/repositories/actor.repository.interface';
import { ActorService } from '../../src/features/movies/services/actor.service';
import { actorValidMock1, actorValidMock2, actorValidMock3 } from '../mocks/actor';

describe('Tests Actor Service', () => {
  it('Validate Actor Ids: Must call specific method and return false if one of the actors`s ids does not exists in the DB.', async () => {
    const listOfValidIds: string[] = givenListOfActorIds();
    const actorMockRepository: ActorRepositoryInterface = givenActorRepository([]);
    const response: Actor[] = await whenValidateActorIds(actorMockRepository, listOfValidIds);
    thenServiceMustReturnEmptyArray(response, actorMockRepository);
  });
  it('Validate Actor Ids: Must call specific method and return true if all actors`s ids exists in the DB.', async () => {
    const listOfValidIds: string[] = givenListOfActorIds();
    const actorMockRepository: ActorRepositoryInterface = givenActorRepository([
      actorValidMock1,
      actorValidMock2,
      actorValidMock3,
    ]);
    const response: Actor[] = await whenValidateActorIds(actorMockRepository, listOfValidIds);
    thenServiceMustReturnArray(response, actorMockRepository);
  });
});

function givenListOfActorIds(): string[] {
  return ['actor-1-mock-uuid', 'actor-2-mock-uuid', 'actor-3-mock-uuid'];
}
function givenActorRepository(response: Actor[]): ActorRepositoryInterface {
  return {
    getAll: jest.fn(),
    getListOfActors: jest.fn().mockReturnValue(response),
  };
}
async function whenValidateActorIds(
  actorMockRepository: ActorRepositoryInterface,
  listOfValidIds: string[],
): Promise<Actor[]> {
  const actorService = new ActorService(actorMockRepository);
  return await actorService.validateListOfActors(listOfValidIds);
}
function thenServiceMustReturnArray(response: Actor[], actorMockRepository: ActorRepositoryInterface): void {
  expect(actorMockRepository.getListOfActors).toBeCalled();
  expect(response?.length).toBeTruthy();
}

function thenServiceMustReturnEmptyArray(response: Actor[], actorMockRepository: ActorRepositoryInterface): void {
  expect(actorMockRepository.getListOfActors).toBeCalled();
  expect(response?.length).toBe(0);
}
