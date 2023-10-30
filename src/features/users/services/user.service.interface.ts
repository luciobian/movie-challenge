import { RegisterUserRequestDto } from '../dto/register-user-request.dto';
import { User } from '../entities/user.entity';

export interface UserServiceInterface {
  register(request: RegisterUserRequestDto): Promise<User>;
  getUserByEmail(email: string): Promise<User>;
  getUserById(id: string): Promise<User>;
}
