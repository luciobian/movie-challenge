import { PasswordEncryptorInterface } from '../../src/features/users/utils/password-encryptor.interface';
import { UserServiceInterface } from '../../src/features/users/services/user.service.interface';
import { AuthService } from '../../src/features/auth/services/auth.service';
import { AuthResponseDto } from '../../src/features/auth/dto/auth-response.dto';
import { LoginRequestDto } from '../../src/features/auth/dto/login-request.dto';
import { HttpException } from '@nestjs/common';
import { regularUserMock } from '../mocks/user';
import { TokenManagerInterface } from '../../src/features/auth/services/token-manager.interface';

describe('Tests Auth Service', () => {
  it('Login User: Must call user service `getUserByEmail` method.', async () => {
    const loginMockDto: LoginRequestDto = givenLoginDto();
    const UserServiceMock: UserServiceInterface = givenUserService();
    const passwordEncryptorMock: PasswordEncryptorInterface = givenPasswordEncryptor();
    const tokenManagerMock: TokenManagerInterface = givenTokenManager();
    await whenLoginUser(UserServiceMock, passwordEncryptorMock, tokenManagerMock, loginMockDto);
    thenLoginUserMustCallUserService(UserServiceMock, passwordEncryptorMock, loginMockDto);
  });

  it('Login User: Must return 401 HTTP error if email does not exists in the DB.', async () => {
    const loginMockDto: LoginRequestDto = givenInvalidLoginDto();
    const UserServiceMock: UserServiceInterface = givenUserServiceWithInvalidUser();
    const passwordEncryptorMock: PasswordEncryptorInterface = givenPasswordEncryptor();
    const tokenManagerMock: TokenManagerInterface = givenTokenManager();
    let errorExpected: Error;
    try {
      await whenLoginUser(UserServiceMock, passwordEncryptorMock, tokenManagerMock, loginMockDto);
    } catch (error) {
      errorExpected = error;
    }
    thenLoginUserMustThrowUnauthorizedHTTPError(errorExpected);
  });

  it('Login User: Must return 401 HTTP error if password is invalid.', async () => {
    const registerMockDto: LoginRequestDto = givenInvalidLoginDto();
    const UserServiceMock: UserServiceInterface = givenUserServiceWithInvalidUser();
    const passwordEncryptorMock: PasswordEncryptorInterface = givenPasswordEncryptorWithInvalidPassword();
    const tokenManagerMock: TokenManagerInterface = givenTokenManager();
    let errorExpected: Error;
    try {
      await whenLoginUser(UserServiceMock, passwordEncryptorMock, tokenManagerMock, registerMockDto);
    } catch (error) {
      errorExpected = error;
    }
    thenLoginUserMustThrowUnauthorizedHTTPError(errorExpected);
  });

  it('Login User: Must return a specific response.', async () => {
    const loginMockDto: LoginRequestDto = givenLoginDto();
    const UserServiceMock: UserServiceInterface = givenUserService();
    const passwordEncryptorMock: PasswordEncryptorInterface = givenPasswordEncryptor();
    const tokenManagerMock: TokenManagerInterface = givenTokenManager();
    const expectedResponse = await whenLoginUser(
      UserServiceMock,
      passwordEncryptorMock,
      tokenManagerMock,
      loginMockDto,
    );
    thenRegisterMustReturnAnSpecificResponse(expectedResponse, loginMockDto);
  });
});

function givenUserService(): UserServiceInterface {
  return {
    getUserByEmail: jest.fn().mockReturnValue(regularUserMock),
    register: jest.fn(),
    getUserById: jest.fn(),
  };
}

function givenTokenManager(): TokenManagerInterface {
  return {
    generateJWT: jest.fn().mockReturnValue('tokenJWTMockGenerated'),
    signJWT: jest.fn(),
    getTokenPayload: jest.fn(),
  };
}

function givenUserServiceWithInvalidUser(): UserServiceInterface {
  return {
    getUserByEmail: jest.fn().mockReturnValue(null),
    register: jest.fn(),
    getUserById: jest.fn(),
  };
}

function givenPasswordEncryptor(): PasswordEncryptorInterface {
  return {
    comparePassword: jest.fn().mockResolvedValue(true),
    encryptPassword: jest.fn(),
  };
}

function givenPasswordEncryptorWithInvalidPassword(): PasswordEncryptorInterface {
  return {
    comparePassword: jest.fn().mockResolvedValue(false),
    encryptPassword: jest.fn(),
  };
}

function thenLoginUserMustThrowUnauthorizedHTTPError(errorExpected): void {
  expect(errorExpected).toEqual(new HttpException('Email/password invalid.', 401));
}

async function whenLoginUser(
  UserServiceMock: UserServiceInterface,
  passwordEncryptorMock: PasswordEncryptorInterface,
  tokenManagerMock: TokenManagerInterface,
  registerMockDto: LoginRequestDto,
): Promise<AuthResponseDto> {
  const authService = new AuthService(UserServiceMock, passwordEncryptorMock, tokenManagerMock);
  return await authService.login(registerMockDto);
}

function thenLoginUserMustCallUserService(
  UserServiceMock: UserServiceInterface,
  passwordEncryptorMock: PasswordEncryptorInterface,
  loginMockDto: LoginRequestDto,
): void {
  expect(UserServiceMock.getUserByEmail).toBeCalledTimes(1);
  expect(UserServiceMock.getUserByEmail).toBeCalledWith(loginMockDto.email);
  expect(passwordEncryptorMock.comparePassword).toBeCalledTimes(1);
  expect(passwordEncryptorMock.comparePassword).toBeCalledWith(loginMockDto.password, regularUserMock.password);
}

function givenLoginDto(): LoginRequestDto {
  return {
    email: 'user@mock.dto',
    password: 'passwordMock',
  };
}

function givenInvalidLoginDto(): LoginRequestDto {
  return {
    email: 'invalid_user@mock.dto',
    password: 'passwordMock',
  };
}

function thenRegisterMustReturnAnSpecificResponse(
  expectedResponse: AuthResponseDto,
  loginMockDto: LoginRequestDto,
): void {
  expect(expectedResponse.accessToken).toBe('tokenJWTMockGenerated');
  expect(expectedResponse.user.email).toBe(loginMockDto.email);
}
