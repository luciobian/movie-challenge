import { UserRepositoryInterface } from '../../src/features/users/repositories/user.interface.repository';
import { User } from '../../src/features/users/entities/user.entity';
import { HttpException } from '@nestjs/common';
import { regularUserMock } from '../mocks/user';
import { PasswordEncryptorInterface } from '../../src/features/users/utils/password-encryptor.interface';
import { RegisterUserRequestDto } from '../../src/features/users/dto/register-user-request.dto';
import { UserService } from '../../src/features/users/services/user.service';
import { RoleServiceInterface } from '../../src/features/roles/services/role.service.interface';
import { roleRegularUserMock } from '../mocks/role';

const passwordEncryptorMock: PasswordEncryptorInterface = {
  comparePassword: jest.fn(),
  encryptPassword: jest.fn().mockReturnValue('thisIsAHashPasswordMock'),
};

describe('Tests User Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Register User: Must return 409 HTTP error if email already exists in the DB.', async () => {
    const registerDtoMock: RegisterUserRequestDto = givenRegisterDto();
    const UserRepoMock: UserRepositoryInterface = givenUserRepoMockWithRepeatedEmail();
    const RoleServiceMock: RoleServiceInterface = givenRoleMock();

    let errorExpected: Error;
    try {
      await whenRegisterUser(UserRepoMock, RoleServiceMock, registerDtoMock);
    } catch (error) {
      errorExpected = error;
    }

    thenRegisterUserMustThrowConflictHTTPError(errorExpected);
  });

  it('Register User: Must call encryptPassword method.', async () => {
    const registerDtoMock: RegisterUserRequestDto = givenRegisterDto();
    const UserRepoMock: UserRepositoryInterface = givenUserRepoMockWithoutRepeatedEmail();
    const RoleServiceMock: RoleServiceInterface = givenRoleMock();

    await whenRegisterUser(UserRepoMock, RoleServiceMock, registerDtoMock);
    thenRegisterUserMustCallHashPassword(registerDtoMock);
  });

  it('Register User: Must call user repository with the password hashed.', async () => {
    const registerDtoMock: RegisterUserRequestDto = givenRegisterDto();
    const UserRepoMock: UserRepositoryInterface = givenUserRepoMockWithoutRepeatedEmail();
    const RoleServiceMock: RoleServiceInterface = givenRoleMock();

    await whenRegisterUser(UserRepoMock, RoleServiceMock, registerDtoMock);
    thenRegisterUserMustCallUserRepoWithPasswordHashed(UserRepoMock, registerDtoMock);
  });

  it('Register User: Must call encryptPassword method.', async () => {
    const registerDtoMock: RegisterUserRequestDto = givenRegisterDto();
    const UserRepoMock: UserRepositoryInterface = givenUserRepoMockWithoutRepeatedEmail();
    const RoleServiceMock: RoleServiceInterface = givenRoleMock();

    await whenRegisterUser(UserRepoMock, RoleServiceMock, registerDtoMock);
    thenRegisterUserMustCallHashPassword(registerDtoMock);
  });

  it('Register User: Must call user roles service with REGULAR_USER.', async () => {
    const registerMockDto: RegisterUserRequestDto = givenRegisterDto();
    const UserRepoMock: UserRepositoryInterface = givenUserRepoMockWithoutRepeatedEmail();
    const RoleServiceMock: RoleServiceInterface = givenRoleMock();

    await whenRegisterUser(UserRepoMock, RoleServiceMock, registerMockDto);
    thenRegisterUserMustCallUserRepoWithPasswordHashed(UserRepoMock, registerMockDto);
  });

  it('Register User: Must return a specific response.', async () => {
    const registerDtoMock: RegisterUserRequestDto = givenRegisterDto();
    const UserRepoMock: UserRepositoryInterface = givenUserRepoMockWithoutRepeatedEmail();
    const RoleServiceMock: RoleServiceInterface = givenRoleMock();

    const expectedResponse = await whenRegisterUser(UserRepoMock, RoleServiceMock, registerDtoMock);
    thenRegisterMustReturnAnSpecificResponse(expectedResponse, registerDtoMock);
  });
});
function givenUserRepoMockWithoutRepeatedEmail(): UserRepositoryInterface {
  return {
    getByEmail: jest.fn().mockReturnValue(null),
    save: jest.fn().mockReturnValue(regularUserMock),
    getById: jest.fn(),
  };
}

function givenUserRepoMockWithRepeatedEmail(): UserRepositoryInterface {
  return {
    getByEmail: jest.fn().mockReturnValue(regularUserMock),
    save: jest.fn().mockReturnValue(regularUserMock),
    getById: jest.fn(),
  };
}
async function whenRegisterUser(
  UserRepoMock: UserRepositoryInterface,
  RoleServiceMock: RoleServiceInterface,
  registerMockDto: RegisterUserRequestDto,
): Promise<User> {
  const userService = new UserService(passwordEncryptorMock, UserRepoMock, RoleServiceMock);
  return await userService.register(registerMockDto);
}

function thenRegisterUserMustThrowConflictHTTPError(errorExpected): void {
  expect(errorExpected).toEqual(new HttpException('Email is already used.', 409));
}
function givenRegisterDto(): RegisterUserRequestDto {
  return {
    name: 'Mock Name User',
    email: 'user@mock.dto',
    password: 'passwordMock',
  };
}

function thenRegisterUserMustCallHashPassword(registerMockDto: RegisterUserRequestDto): void {
  expect(passwordEncryptorMock.encryptPassword).toBeCalledTimes(1);
  expect(passwordEncryptorMock.encryptPassword).toBeCalledWith(registerMockDto.password);
}

function thenRegisterUserMustCallUserRepoWithPasswordHashed(
  UserRepoMock: UserRepositoryInterface,
  registerMockDto: RegisterUserRequestDto,
): void {
  expect(UserRepoMock.save).toBeCalledTimes(1);
  expect(UserRepoMock.save).toBeCalledWith(
    {
      ...registerMockDto,
      password: 'thisIsAHashPasswordMock',
    },
    roleRegularUserMock,
  );
}

function thenRegisterMustReturnAnSpecificResponse(expectedResponse: User, registerDtoMock: RegisterUserRequestDto) {
  expect(expectedResponse.email).toBe(registerDtoMock.email);
  expect(expectedResponse.role.name).toBe('REGULAR_USER');
  expect(expectedResponse.id).toBe('uuidMockUser');
}
function givenRoleMock(): RoleServiceInterface {
  return { getByName: jest.fn().mockReturnValue(roleRegularUserMock) };
}
