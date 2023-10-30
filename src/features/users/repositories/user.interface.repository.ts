import { Role } from '../../roles/entities/roles.entity';
import { RegisterUserRequestDto } from '../dto/register-user-request.dto';
import { User } from '../entities/user.entity';

export interface UserRepositoryInterface {
  getByEmail(email: string): Promise<User>;
  save(user: RegisterUserRequestDto, role: Role): Promise<User>;
  getById(id: string): Promise<User>;
}
