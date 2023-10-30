import { HttpException } from '@nestjs/common';
import { Role } from '../../src/features/roles/entities/roles.entity';
import { RoleRepositoryInterface } from '../../src/features/roles/repositories/role.repository.interface';
import { RoleService } from '../../src/features/roles/services/role.service';
import { roleRegularUserMock } from '../mocks/role';

describe('Tests Role Service', () => {
  it('Get Role by Name: Must call specific method and return `Not Found` http exception if name does not exists in the DB.', async () => {
    const invalidId: string = givenRoleName();
    const roleMockRepository: RoleRepositoryInterface = givenRoleRepository(null);

    let errorExpected: Error;
    try {
      await whenGetRoleByName(roleMockRepository, invalidId);
    } catch (error) {
      errorExpected = error;
    }

    thenServiceMustThrowHttpNotFoundError(errorExpected, roleMockRepository);
  });
  it('Get Role by Name: Must call specific method and return the role object if name exists in the DB.', async () => {
    const validId: string = givenRoleName();
    const roleMockRepository: RoleRepositoryInterface = givenRoleRepository(roleRegularUserMock);
    const response: Role = await whenGetRoleByName(roleMockRepository, validId);

    thenServiceMustReturnRole(response, roleMockRepository);
  });
});

function givenRoleName(): string {
  return 'REGULAR_USER_MOCK';
}
function givenRoleRepository(response: Role): RoleRepositoryInterface {
  return {
    getByName: jest.fn().mockReturnValue(response),
  };
}
async function whenGetRoleByName(roleMockRepository: RoleRepositoryInterface, name: string): Promise<Role> {
  const roleService = new RoleService(roleMockRepository);
  return await roleService.getByName(name);
}
function thenServiceMustReturnRole(response: Role, roleMockRepository: RoleRepositoryInterface): void {
  expect(roleMockRepository.getByName).toBeCalled();
  expect(response.name).toBe('REGULAR_USER');
  expect(response.id).toBe('df298f6e-74f3-11ee-b962-0242ac120002');
}

function thenServiceMustThrowHttpNotFoundError(errorExpected: Error, roleMockRepository: RoleRepositoryInterface) {
  expect(roleMockRepository.getByName).toBeCalled();
  expect(roleMockRepository.getByName).toBeCalledWith('REGULAR_USER_MOCK');
  expect(errorExpected).toEqual(new HttpException('Role not found.', 404));
}
