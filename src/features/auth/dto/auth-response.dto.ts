import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';

export class AuthResponseDto {
  @ApiProperty({ description: 'Authorization token.', type: 'string' })
  accessToken: string;
  @ApiProperty({ description: `'User's information`, type: User })
  user: User;
}
