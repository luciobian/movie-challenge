import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail } from 'class-validator';

export class LoginRequestDto {
  @IsDefined()
  @IsEmail()
  @ApiProperty({ description: 'Registered email.', type: 'string', example: 'jdoe@test.com' })
  email: string;
  @IsDefined()
  @ApiProperty({ description: `User's password`, type: 'string', example: 'Pass123.' })
  password: string;
}
