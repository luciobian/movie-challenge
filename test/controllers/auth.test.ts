import { AuthController } from '../../src/features/auth/controllers/auth.controller';
import { UserServiceInterface } from '../../src/features/users/services/user.service.interface';
import { AuthResponseDto } from '../../src/features/auth/dto/auth-response.dto';
import { LoginRequestDto } from '../../src/features/auth/dto/login-request.dto';
import { User } from '../../src/features/users/entities/user.entity';
import { RegisterUserRequestDto } from '../../src/features/users/dto/register-user-request.dto';
import { AuthServiceInterface } from '../../src/features/auth/services/auth.service.interface';

describe('Tests Auth Controller', () => {
  it('Register User: Must call register method of auth service with user as parameter', async () => {
    const registerMockDto: RegisterUserRequestDto = givenRegisterDto();
    const UserServiceMock: UserServiceInterface = givenUserService();
    const AuthServiceMock: AuthServiceInterface = givenAuthService();
    await whenRegisterUser(AuthServiceMock, UserServiceMock, registerMockDto);
    thenRegisterUserMustBeCalledWithUserDTO(UserServiceMock, registerMockDto);
  });

  it('Login: Must call login method of auth service with user as parameter', async () => {
    const userDTOMock: LoginRequestDto = givenLoginDto();
    const UserServiceMock: UserServiceInterface = givenUserService();
    const AuthServiceMock: AuthServiceInterface = givenAuthService();
    await whenLoginUser(AuthServiceMock, UserServiceMock, userDTOMock);
    thenLoginMustBeCalledWithUserDTO(AuthServiceMock, userDTOMock);
  });
});
function givenAuthService(): AuthServiceInterface {
  return {
    login: jest.fn(),
  };
}

function givenUserService(): UserServiceInterface {
  return {
    register: jest.fn(),
    getUserByEmail: jest.fn(),
    getUserById: jest.fn(),
  };
}
async function whenRegisterUser(
  AuthServiceMock: AuthServiceInterface,
  UserServiceMock: UserServiceInterface,
  registerMockDto: RegisterUserRequestDto,
): Promise<User> {
  const authController = new AuthController(AuthServiceMock, UserServiceMock);
  return await authController.registerUser(registerMockDto);
}

async function whenLoginUser(
  AuthServiceMock: AuthServiceInterface,
  UserServiceMock: UserServiceInterface,
  loginMockDto: LoginRequestDto,
): Promise<AuthResponseDto> {
  const authController = new AuthController(AuthServiceMock, UserServiceMock);
  return await authController.login(loginMockDto);
}

function thenRegisterUserMustBeCalledWithUserDTO(
  UserServiceMock: UserServiceInterface,
  registerMockDto: RegisterUserRequestDto,
): void {
  expect(UserServiceMock.register).toBeCalledTimes(1);
  expect(UserServiceMock.register).toBeCalledWith(registerMockDto);
}

function thenLoginMustBeCalledWithUserDTO(AuthServiceMock: AuthServiceInterface, loginMockDto: LoginRequestDto): void {
  expect(AuthServiceMock.login).toBeCalledTimes(1);
  expect(AuthServiceMock.login).toBeCalledWith(loginMockDto);
}
function givenRegisterDto(): RegisterUserRequestDto {
  return {
    name: 'Mock Name User',
    email: 'user@mock.dto',
    password: 'passwordMock',
  };
}

function givenLoginDto(): LoginRequestDto {
  return {
    email: 'user@mock.dto',
    password: 'passwordMock',
  };
}
