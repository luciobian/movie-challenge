import { Body, Controller, HttpCode, Inject, Post } from '@nestjs/common';
import EnumHttpCodes from '../../../shared/utils/http-code.enum';
import { InjectionEnum } from '../../../shared/utils/injection.enum';
import { AuthServiceInterface } from '../services/auth.service.interface';
import { RegisterUserRequestDto } from '../../users/dto/register-user-request.dto';
import { AuthResponseDto } from '../dto/auth-response.dto';
import { LoginRequestDto } from '../dto/login-request.dto';
import { User } from '../../users/entities/user.entity';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserServiceInterface } from '../../users/services/user.service.interface';

@ApiTags('Auth')
@Controller('/auth')
export class AuthController {
  constructor(
    @Inject(InjectionEnum.AUTH_SERVICE)
    private readonly authService: AuthServiceInterface,
    @Inject(InjectionEnum.USER_SERVICE)
    private readonly userService: UserServiceInterface,
  ) {}

  @ApiOperation({ summary: 'Create a new user.' })
  @ApiOkResponse({
    description: 'The user records',
    type: User,
    isArray: false,
  })
  @Post('/register')
  @HttpCode(EnumHttpCodes.CREATED)
  public async registerUser(@Body() request: RegisterUserRequestDto): Promise<User> {
    return this.userService.register(request);
  }

  @ApiOperation({ summary: 'Get token.' })
  @ApiOkResponse({
    description: 'The access token and user info.',
    type: AuthResponseDto,
    isArray: false,
  })
  @Post('/login')
  @HttpCode(EnumHttpCodes.OK)
  public async login(@Body() request: LoginRequestDto): Promise<AuthResponseDto> {
    return this.authService.login(request);
  }
}
