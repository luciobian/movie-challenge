import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsStrongPassword } from 'class-validator';

export class RegisterUserRequestDto {
  @IsDefined()
  @ApiProperty({ description: 'Name of the user.', type: 'string', example: 'John Doe' })
  name: string;
  @IsDefined()
  @IsEmail()
  @ApiProperty({ description: 'Email of the user.', type: 'string', example: 'jdoe@test.com' })
  email: string;
  @IsStrongPassword()
  @ApiProperty({ description: 'Password of the user.', type: 'string', example: 'Pass123.' })
  password: string;
}
